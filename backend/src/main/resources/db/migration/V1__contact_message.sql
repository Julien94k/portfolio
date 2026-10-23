-- UUID plutôt qu'un entier : les identifiants des messages ne se devinent pas.
CREATE TABLE contact_message (
    id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(254)  NOT NULL,
    company     VARCHAR(120),
    message     VARCHAR(4000) NOT NULL,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),
    read_at     TIMESTAMPTZ
);

-- Sert à la liste de l'admin (plus récents d'abord), au plafond quotidien et à la purge.
CREATE INDEX contact_message_created_at_idx ON contact_message (created_at DESC);
