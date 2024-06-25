import pandas as pd
import os

# Carregar o arquivo Excel
excel_file = 'C:\\Users\\cebe_lgopereira\\OneDrive - SABO INDUSTRIA E COMERCIO DE AUTOPEÇAS S A\\Área de Trabalho\\Projetos\\Andon Rogerio\\arquivos\\quadro_de_linha.xls'

# Carregar todas as planilhas em um dicionário
xls = pd.ExcelFile(excel_file)

# Diretório de saída
output_dir = 'C:\\Users\\cebe_lgopereira\\OneDrive - SABO INDUSTRIA E COMERCIO DE AUTOPEÇAS S A\\Área de Trabalho\\Projetos\\Andon Rogerio\\arquivos\\'

# Iterar sobre todas as planilhas
for sheet_name in xls.sheet_names:
    # Ler cada planilha
    df = pd.read_excel(xls, sheet_name=sheet_name)

    # Remover linhas vazias
    df.dropna(how='all', inplace=True) 

    # Criar um nome de arquivo seguro para o sistema de arquivos
    safe_sheet_name = "".join([c if c.isalnum() else "_" for c in sheet_name])

    # Definir o caminho de saída para cada planilha
    output_file = os.path.join(output_dir, f'{safe_sheet_name}.txt')

    # Salvar a planilha como um arquivo TXT separado por vírgulas
    df.to_csv(output_file, sep=',', index=False)

    print(f'Salvo: {output_file}')