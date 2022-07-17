# UI Test

## Usage

Run `npm install`, then `npm start`. Enjoy it: )

## Different behavior

I notice the example won't change the checkbox status for those users who will be toggled on and off by show terminated enployees. When they are toggled off then on again, they will still keep the status as they were before toggling off.

In my work, when the user is toggled off by the switch, its checkbox status will always be reset to false.

Since the toggle botton makes server requests and update users, I think users who have been removed from the client side shouldn't still have their status in the app.

## Issues

- Warning: findDOMNode is deprecated in StrictMode.

  This warning will show when the app is running. I googled it and found it's a known issue from semantic ui. It is said they will update their code and remove the deprecated api. So I just didn't solve it and leave it there.

- init.sh

  This file is located at the app root folder and solve another issue from semantic ui in their css file. More info:  [[BUG] Error using semantic-ui-css to create-react-app #7073](https://github.com/Semantic-Org/Semantic-UI/issues/7073).

  This file can solve the extra `;` probelem when the app is compiling. It should work both on Windows and Mac.
