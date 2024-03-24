import re
import json

# Text containing the file operations
text = """
# Otvaramo fajl 'input.txt' u režimu čitanja ('r')
with open('input.txt', 'r') as input_file:
    # Čitamo sadržaj fajla
    content = input_file.read()

    # Otvaramo fajl 'output.txt' u režimu pisanja ('w')
    with open('output.txt', 'w') as output_file:
        # Pišemo sadržaj u 'output.txt'
        output_file.write(content)
"""

# Regex pattern to match file names ending with .txt
pattern = r"\b[a-zA-Z0-9_]+\.txt\b"

# Find all occurrences of the pattern
file_names = re.findall(pattern, text)

# Remove duplicates by converting the list to a set and back to a list
file_names = list(set(file_names))

# Save the file names in a dictionary
files_dict = {f"file_{i+1}": name for i, name in enumerate(file_names)}

# Write the dictionary to a JSON file
with open('file_names.json', 'w') as json_file:
    json.dump(files_dict, json_file, indent=4)

print("File names have been written to file_names.json")
