# pop.js

## Simple JavaScript Popup Library

**pop.js** is a simple to implement, option-based, jQuery dependent, client-side Javascript library. The Library is designed to allow the developer to simply reference the **pop.js** file and accompanying **pop.css** file in their project, then call a simple function and pass an options object in JSON format. **pop.js** is a powerful way to deliver highly customizable popup notifications to the end user.
<br>
<hr>
###Default Pop up
Call the `simplePopup({options},[callback])` function and pass a Title, Body, and the text for the popup dismissal button in a JSON object as seen in the following example:

**Source Code**
```javascript
simplePopup({
    'pop-title': 'Pop Default Demo',
    'pop-body': 'This is a demonstration of a simple popup.
                 The point is to present information to the
                 user and provide a way to dismiss the popup.', 
    'btn-text': 'Dismiss'
});
```
##Options
A full range of option are available in order to customize the 
popup's look and feel.  Below is a full list of optional object literals
dispalying the literal name and possible literal values:

#### AVAILABLE OPTIONS   
<table>
<tr><th>Option Name</th><th colspan=5>Options (defaults highlighted)</th></tr>
<tr><td>shrink-in:</td><td><b>true</b></td><td>false</td><td><td></td><td></td></td></tr>
<tr><td>slide-in:</td><td><b>true</b></td><td>false</td><td></td><td></td><td></td></tr>
<tr><td>slide-out:</td><td><b>true</b></td><td>false</td><td></td><td></td><td></td></tr>
<tr><td>btn-style:</td><td><b>'primary'</b></td><td>'error'</td><td>'success'</td><td>'default'</td><td>'none'</td></tr>
<tr><td>round-corners:</td><td><b>true</b></td><td>false</td><td></td><td></td><td></td></tr>
<tr><td>head-align:</td><td>'left'</td><td><b>'center'</b></td><td>'right'</td><td></td><td></td></tr>
<tr><td>body-align:</td><td>'left'</td><td><b>'center'</b></td><td>'right'</td><td></td><td></td></tr>
<tr><td>foot-align:</td><td>'left'</td><td><b>'center'</b></td><td>'right'</td><td></td><td></td></tr>
<tr><td>header-bg-shade:</td><td><b>true</b></td><td>false</td><td></td><td></td><td></td></tr>
<tr><td>footer-bg-shade:</td><td>true</td><td><b>false</b></td><td></td><td></td><td></td></tr>
<tr><td>dragable:</td><td><b>true</b></td><td>false</td><td></td><td></td><td></td></tr>
<tr><td>auto-break:</td><td><b>-1</b></td><td>[integer]</td><td></td><td></td><td></td></tr>
<tr><td>pop-title:</td><td>{string}</td><td></td><td></td><td></td><td></td></tr>
<tr><td>pop-body:</td><td>{string}</td><td></td><td></td><td></td><td></td></tr>
<tr><td>btn-text:</td><td>{string}</td><td></td><td></td><td></td><td></td></tr>
<tr><td>click-fn:</td><td>{function}</td><td></td><td></td><td></td><td></td></tr>
</table>

##Option Definitions

- **shrink-in:** This option, when set to true, causes the popup to shrink slightly while fading in.  
- **slide-in:** This option, when set to true, causes the popup to slide upward slightly while fading in.  
- **slide-out:** This option, when set to true, causes the popup to slide downward slightly while fading out.  
- **btn-style:** This option allows a choice between four different color schemes (primary=blue, error=red, success=green, default=grey) for the dismissal button as well as a fifth option (none) where no "button" is displayed but the entire popup footer becomes the button.
- **round-corners:** This option, when set to true, causes the popup to have rounded corners.  
- **head-align:** This option aligns the contents of the header bar to the setting designated - left, center, or right.  
- **body-align:** This option aligns the contents of the popup body to the setting designated - left, center, or right.  
- **foot-align:** This option aligns the contents of the footer bar to the setting designated - left, center, or right.  
- **header-bg-shade:** This option toggles a shaded background on the header bar.  
- **footer-bg-shade:** This option toggles a shaded background on the footer bar.  
- **dragable:** This option, when set to true, allows the popup to be dragged by the header bar to a new position.  
- **auto-break:** This option, by setting the value to a positive integer, modifies the text supplied in the 'pop-body' so that it word wraps at the first white space after the count of characters equal to the supplied integer.  This option only applys to text only content. Content containing hypertext markup will be inserted as-is.  
- **click-fn:** The 'click-fn' (click function) option can be defined in the options object literal to cause a custom action to occur at popup dismissal. This can be handled in one of two ways:

    Anonymous Function<br>
    ```javascript
    'click-fn': function() { some code here;}
    ```
    Named Function<br>
    ```javascript
    'click-fn': doThatThing // where 'doThatThing' is a call to a valid function
    ```

###Custom Pop up

Below is an example of a customized popup using some of the options discussed above.

```javascript
simplePopup({
    'shrink-in':true,
    'slide-in':true,
    'slide-out':true,
    'btn-style':'success', 
    'round-corners':true, 
    'head-align':'center', 
    'body-align':'center', 
    'foot-align':'right', 
    'header-bg-shade':false,
    'footer-bg-shade':true,
    'dragable':true, 
    'auto-break': 25,
    'pop-title':'Pop Custom Demo', 
    'pop-body':'This is a demonstration of
                a customized popup. Notice
                the differences in style and
                presentation.', 
    'btn-text':'Dismiss',
    'click-fn':sampleExitTask
});
```
