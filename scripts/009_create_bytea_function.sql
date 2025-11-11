-- Função para inserir candidato com bytea (fotos)
-- PostgREST aceita bytea via base64, então convertemos no banco usando decode()

create or replace function public.insert_candidate_with_photo(
  p_name text,
  p_number integer,
  p_city text,
  p_talent text,
  p_stage_name text default null,
  p_age smallint default null,
  p_height_cm smallint default null,
  p_bio text default null,
  p_instagram text default null,
  p_photo_base64 text default null,
  p_photo_mime text default null,
  p_photo_thumb_base64 text default null,
  p_photo_thumb_mime text default null
)
returns uuid
language plpgsql
security definer
as $$
declare
  v_id uuid;
  v_photo bytea;
  v_photo_thumb bytea;
begin
  -- Converter base64 para bytea
  v_photo := CASE WHEN p_photo_base64 IS NOT NULL THEN decode(p_photo_base64, 'base64') ELSE NULL END;
  v_photo_thumb := CASE WHEN p_photo_thumb_base64 IS NOT NULL THEN decode(p_photo_thumb_base64, 'base64') ELSE NULL END;
  
  insert into public.candidates (
    name, number, city, stage_name, age, height_cm, talent, bio, instagram,
    photo, photo_mime, photo_thumb, photo_thumb_mime
  ) values (
    p_name, p_number, p_city, p_stage_name, p_age, p_height_cm, p_talent, p_bio, p_instagram,
    v_photo, p_photo_mime, v_photo_thumb, p_photo_thumb_mime
  )
  returning id into v_id;
  
  return v_id;
end;
$$;

-- Dar permissão para usuários autenticados
grant execute on function public.insert_candidate_with_photo to authenticated;

