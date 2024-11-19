import os
import re

def get_script_name(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        match = re.search(r'@name:zh-CN\s*(.+)', content)
        if not match:
            match = re.search(r'@name\s*(.+)', content)
        return match.group(1).strip() if match else '未知'

def generate_markdown_table(directory):
    files = os.listdir(directory)
    user_js_files = [f for f in files if f.endswith('.user.js')]

    table = "| 脚本名称 | 文件名 |\n"
    table += "|----------|--------|\n"

    for file_name in user_js_files:
        file_path = os.path.join(directory, file_name)
        script_name = get_script_name(file_path)
        table += f"| {script_name} | [安装](https://raw.githubusercontent.com/anaer/UserScript/main/user.js/{file_name}) |\n"

    return table

def save_markdown_table_to_file(directory, output_file):
    markdown_table = generate_markdown_table(directory)
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(markdown_table)

if __name__ == "__main__":
    save_markdown_table_to_file("user.js", "README.md")
    print(f"处理完成")
