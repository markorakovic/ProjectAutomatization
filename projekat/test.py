import re
import json

# File containing the Python code
code_file_name = 'test.py'

# Regular expression pattern to match file names in the open function
# This will capture strings within the open function call
regex_pattern = r"open\(['\"](.*?)['\"]"

# Read the content from the code file
with open(code_file_name, 'r') as code_file:
    code_content = code_file.read()

    # Find all occurrences of the pattern
    file_names = re.findall(regex_pattern, code_content)

    # Create a dictionary to store the file names
    files_dict = {f"file_{i+1}": name for i, name in enumerate(file_names)}

    # Write the dictionary to a JSON file
    with open('file_names.json', 'w') as json_file:
        json.dump(files_dict, json_file, indent=4)

print("File names have been written to file_names.json")
