import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState, type FormEvent } from 'react'

import { sendContact, type ContactPayload } from '../api/contact'
import { ApiError } from '../api/http'

type Field = 'name' | 'email' | 'company' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>

const empty: Values = { name: '', email: '', company: '', message: '' }
const order: Field[] = ['name', 'email', 'company', 'message']

/** Mêmes règles que l'API, pour répondre tout de suite. L'API reste seule juge. */
function validate(values: Values): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Indiquez votre nom.'
  if (!values.email.trim()) errors.email = 'Indiquez votre adresse e-mail.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Cette adresse e-mail n’est pas valide.'
  const length = values.message.trim().length
  if (length === 0) errors.message = 'Écrivez votre message.'
  else if (length < 10 || length > 4000) errors.message = 'Entre 10 et 4000 caractères.'
  return errors
}

function generalError(error: unknown): string | undefined {
  if (!(error instanceof ApiError)) return undefined
  const { status, detail } = error.problem
  if (status === 400) return undefined
  if (status === 429) return detail ?? 'Trop d’envois depuis votre connexion. Réessayez dans une minute.'
  return detail ?? 'L’envoi a échoué. Réessayez dans un instant, ou écrivez-moi sur LinkedIn.'
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [website, setWebsite] = useState('')
  const startedAt = useRef(0)
  const fields = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({})
  const confirmation = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const mutation = useMutation({
    mutationFn: (payload: ContactPayload) => sendContact(payload),
    onSuccess: () => setValues(empty),
    onError: (error) => {
      if (error instanceof ApiError && error.problem.errors) {
        showErrors(error.problem.errors as Errors)
      }
    },
  })

  // La confirmation remplace le formulaire : on y amène le focus, sinon un lecteur d'écran reste sur un
  // bouton qui n'existe plus.
  useEffect(() => {
    if (mutation.isSuccess) confirmation.current?.focus()
  }, [mutation.isSuccess])

  function showErrors(next: Errors) {
    setErrors(next)
    const first = order.find((field) => next[field])
    if (first) fields.current[first]?.focus()
  }

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const found = validate(values)
    if (Object.keys(found).length > 0) {
      showErrors(found)
      return
    }
    mutation.mutate({ ...values, website, elapsedMs: Date.now() - startedAt.current })
  }

  if (mutation.isSuccess) {
    return (
      <div className="form-success" ref={confirmation} tabIndex={-1} role="status">
        <p>Message envoyé, merci. Il arrive directement sur mon téléphone, je vous réponds par e-mail.</p>
        <button
          type="button"
          className="button-quiet"
          onClick={() => {
            startedAt.current = Date.now()
            mutation.reset()
          }}
        >
          Écrire un autre message
        </button>
      </div>
    )
  }

  const failure = generalError(mutation.error)

  function input(field: Field, label: string, options: { type?: string; autoComplete?: string; optional?: boolean }) {
    const id = `contact-${field}`
    const error = errors[field]
    return (
      <div className="field">
        <label htmlFor={id}>
          {label}
          {options.optional && <span className="optional"> (facultatif)</span>}
        </label>
        <input
          id={id}
          name={field}
          type={options.type ?? 'text'}
          autoComplete={options.autoComplete}
          value={values[field]}
          onChange={(event) => update(field, event.target.value)}
          ref={(element) => {
            fields.current[field] = element
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          maxLength={field === 'email' ? 254 : field === 'company' ? 120 : 100}
        />
        {error && (
          <p className="field-error" id={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    )
  }

  const messageError = errors.message
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {input('name', 'Nom', { autoComplete: 'name' })}
      {input('email', 'Adresse e-mail', { type: 'email', autoComplete: 'email' })}
      {input('company', 'Entreprise', { autoComplete: 'organization', optional: true })}
      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          maxLength={4000}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          ref={(element) => {
            fields.current.message = element
          }}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? 'contact-message-error' : undefined}
        />
        {messageError && (
          <p className="field-error" id="contact-message-error">
            {messageError}
          </p>
        )}
      </div>

      {/* Piège à robots : invisible et hors du parcours clavier, un humain le laisse vide. */}
      <div className="trap" aria-hidden="true">
        <label htmlFor="contact-website">Site web</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {failure && (
        <p className="form-error" role="alert">
          {failure}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="button" disabled={mutation.isPending}>
          {mutation.isPending ? 'Envoi en cours…' : 'Envoyer le message'}
        </button>
      </div>
      <p className="form-note">
        Votre message est conservé un an au plus, puis supprimé. Il n’est transmis à personne.
      </p>
    </form>
  )
}
