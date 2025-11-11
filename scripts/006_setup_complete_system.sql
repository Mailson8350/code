-- Sistema de Votação - Configuração Completa
-- Este script cria o admin e insere candidatos de exemplo

-- Inserir candidatos de exemplo
INSERT INTO candidates (id, number, name, party, bio, proposals, photo_url)
VALUES 
  (gen_random_uuid(), 10, 'João Silva', 'Partido Progressista', 'Economista com 20 anos de experiência em gestão pública', 'Educação de qualidade, Saúde acessível, Emprego para todos', '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 20, 'Maria Santos', 'Partido Democrático', 'Advogada especializada em direitos humanos', 'Segurança pública, Transparência governamental, Moradia digna', '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 30, 'Carlos Oliveira', 'Partido Trabalhista', 'Engenheiro e empresário local', 'Infraestrutura moderna, Tecnologia e inovação, Meio ambiente', '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 40, 'Ana Costa', 'Partido Verde', 'Professora e ativista ambiental', 'Sustentabilidade, Educação inclusiva, Cultura e esporte', '/placeholder.svg?height=300&width=300')
ON CONFLICT (number) DO NOTHING;
