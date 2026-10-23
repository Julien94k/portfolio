import type { Block } from '../content/types'

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        typeof block === 'string' ? (
          <p key={index}>{block}</p>
        ) : (
          <figure key={index} className="code">
            <pre>
              <code data-language={block.language}>{block.code}</code>
            </pre>
            <figcaption>{block.caption}</figcaption>
          </figure>
        ),
      )}
    </>
  )
}
