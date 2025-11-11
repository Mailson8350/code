-- Inserir candidatos de exemplo
insert into public.candidates (name, number, party, bio, proposals, photo_url) values
  (
    'Maria Silva',
    10,
    'Partido Progressista',
    'Advogada com 15 anos de experiência em direitos humanos, comprometida com políticas públicas inclusivas.',
    'Educação de qualidade para todos; Saúde pública fortalecida; Transporte sustentável',
    '/placeholder.svg?height=400&width=400'
  ),
  (
    'João Santos',
    20,
    'Partido Social',
    'Empresário e empreendedor social focado em desenvolvimento econômico sustentável.',
    'Geração de empregos; Incentivo ao empreendedorismo; Infraestrutura moderna',
    '/placeholder.svg?height=400&width=400'
  ),
  (
    'Ana Costa',
    30,
    'Partido Verde',
    'Ambientalista e ativista, dedicada à preservação ambiental e qualidade de vida urbana.',
    'Meio ambiente preservado; Energia renovável; Áreas verdes nas cidades',
    '/placeholder.svg?height=400&width=400'
  ),
  (
    'Carlos Oliveira',
    40,
    'Partido Democrático',
    'Ex-secretário de educação com foco em políticas educacionais inovadoras.',
    'Escolas modernizadas; Tecnologia na educação; Valorização dos professores',
    '/placeholder.svg?height=400&width=400'
  )
on conflict (number) do nothing;
