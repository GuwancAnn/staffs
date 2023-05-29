create table
  public.staffs (
    id bigint generated by default as identity not null,
    name text null,
    professions_id bigint null,
    departments_id bigint null,
    birthday date null,
    started_day date null,
    working_for text null,
    languages text null,
    choices text null,
    another_country text null,
    deputy text null,
    party_member text null,
    constraint staffs_pkey primary key (id)
  ) tablespace pg_default;