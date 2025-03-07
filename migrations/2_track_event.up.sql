CREATE TABLE track_event (
    id SERIAL primary key,
    type text not null,
    data jsonb not null,
    created_at timestamp not null,
    updated_at timestamp not null
)
