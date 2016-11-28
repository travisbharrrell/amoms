# amoms

## Setup
1. Download Python 2.7.x, and Django. Can either do this through the Python website, or through the Bash terminal for Windows (sudo apt-get install python-django)
2. Clone this repo
3. Navigate to the repo, in the root folder of the repo should be the manage.py file.
4. Open the bash terminal or command prompt for Windows.
5. Type python manage.py runserver.
6. Navigate to http://127.0.0.1:8000/. You should see the AMOMS mockup. 

# Notes:
Currently no accounts of passwords being mocked. To be added.

To modify the view you want to work on, open homescreen.template.html and mockup.css. This is for the visual part of the app. If you need to add
JS support, add it to homescreen.component.js. Name the functions after the view. Eventually these will be moved to directives instead of being all shoved
into one JS file.

Two way binding between the HTML template and controller is referenced by $ctrl.variableName or $ctrl.functionSignature([args...]) in the template.