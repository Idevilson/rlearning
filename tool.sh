#!/bin/zsh

# Função para contar linhas em um arquivo
contar_linhas() {
  wc -l < "$1"
}

# Função para contar linhas em um diretório e seus subdiretórios
contar_linhas_diretorio() {
  local diretorio=$1
  local total_linhas=0
  local total_arquivos=0

  # Loop através de todos os arquivos do diretório
  for arquivo in $diretorio/**/*(.); do
    # Excluir arquivos de imagem e SVG
    if [[ ! "$arquivo" =~ \.(jpg|jpeg|png|gif|bmp|tiff|ico|svg)$ ]]; then
      linhas=$(contar_linhas "$arquivo")
      total_linhas=$((total_linhas + linhas))
      total_arquivos=$((total_arquivos + 1))
      echo "O arquivo $arquivo possui $linhas linhas."
    fi
  done

  echo "Total de linhas no diretório $diretorio: $total_linhas"
  echo "Total de arquivos no diretório $diretorio: $total_arquivos"
  echo $total_linhas >> /tmp/total_linhas_tempfile  # Adiciona o total de linhas a um arquivo temporário
  echo $total_arquivos >> /tmp/total_arquivos_tempfile  # Adiciona o total de arquivos a um arquivo temporário
}

# Variáveis para armazenar o total de linhas e arquivos em todos os diretórios
total_linhas=0
total_arquivos=0

# Pasta inicial
pasta_inicial="./"

# Limpa os arquivos temporários antes de começar
rm -f /tmp/total_linhas_tempfile
rm -f /tmp/total_arquivos_tempfile

# Loop através de todos os diretórios e subdiretórios
for diretorio in $pasta_inicial/**/*(/); do
  contar_linhas_diretorio "$diretorio"
done

# Calcula o total de linhas a partir do arquivo temporário
total_linhas=$(awk '{s+=$1} END {print s}' /tmp/total_linhas_tempfile)
total_arquivos=$(awk '{s+=$1} END {print s}' /tmp/total_arquivos_tempfile)

echo "Total de linhas em todos os diretórios: $total_linhas"
echo "Total de arquivos em todos os diretórios: $total_arquivos"

# Limpa os arquivos temporários
rm -f /tmp/total_linhas_tempfile
rm -f /tmp/total_arquivos_tempfile
