CREATE TABLE track_types (
    id int not null,
    name text not null,
    emoji text not null,
    color text not null, 
    metric_type text not null, 
    created_at timestamp not null,
    updated_at timestamp not null
);
