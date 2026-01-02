import requests
import json
import sys

API_URL = "http://localhost:8000/edit"

def test_edit(section_name, current_content, instruction):
    with open("verify_results.txt", "a") as f:
        f.write(f"\n--- Testing Section: {section_name} (Input Type: {type(current_content).__name__}) ---\n")
    
    payload = {
        "current_content": current_content,
        "instruction": instruction,
        "section_name": section_name
    }
    
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        
        result_content = data.get("content")
        result_type = type(result_content).__name__
        
        with open("verify_results.txt", "a") as f:
            f.write(f"Status: Success\n")
            f.write(f"Result Type: {result_type}\n")
            f.write(f"Content: {json.dumps(result_content, indent=2)}\n")
            
    except Exception as e:
        with open("verify_results.txt", "a") as f:
            f.write(f"Status: Failed - {e}\n")
            if 'response' in locals():
                 f.write(f"Response: {response.text}\n")

# Clear file
open("verify_results.txt", "w").close()

# Test 1: Projects (Dict Input)
project_content = {
    "name": "Data Analysis",
    "description": "Analysed data.",
    "tech_stack": ["Python", "SQL"]
}
test_edit("projects", project_content, "Improve description.")

# Test 2: Experience (Dict Input)
exp_content = {
    "company": "Tech Corp",
    "role": "Data Scientist",
    "highlights": ["Built models."]
}
test_edit("experience", exp_content, "Add more detail to highlights.")

# Test 3: Skills (List Input)
skills_content = [
    {"category_name": "Languages", "skills": ["Python"]}
]
test_edit("skills", skills_content, "Add Java.")
