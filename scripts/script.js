// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '/catalog' },
    { text: 'orders', href: '/orders' },
    { text: 'account', href: '/account' },
];

// Select and cache the <main> element in a variable named mainEl.
let mainEl = document.querySelector('main')
console.log(mainEl)

//Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
//Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.

mainEl.style.backgroundColor = 'var(--main-bg)'

//Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`

//Add a class of flex-ctr to mainEl.
//Hint: Use the Element.classList API.
mainEl.classList.add('flex-ctr');

// Select a cache the <nav id= "top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById('top-menu');

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = '100%';

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around');

// Iterate over the entire menuLinks array and for each "link" object:
menuLinks.forEach(link => {

// Create an <a> element.
let newLink = document.createElement('a')

// On the new element, add an href attribute with its value set to the href property of the "link" object.
newLink.setAttribute('href', link.href)

// Set the new element's content to the value of the text property of the "link" object.
newLink.textContent = link.text;

// Append the new element to the topMenuEl element.
topMenuEl.appendChild(newLink)
});

// Creating the Submenu
let subMenuEl = document.getElementById('sub-menu');

// Set the height of subMenuEl element to be 100%.
subMenuEl.style.height = '100%';

// Set the backgrond color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// Add a class of flex-around to subMenuEl.
subMenuEl.classList.add('flex-around');

// Temporarily hide the Submenu.
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

// Update menu links array.
let topMenuLinks = topMenuEl.querySelectorAll('a');
var menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '#', subLinks: [
        { text: 'all', href: '/catalog/all' },
        { text: 'top selling', href: '/catalog/top' },
        { text: 'search', href: '/catalog/search' },
    ]},
    { text: 'orders', href: '#', subLinks: [
        { text: 'new', href: '/orders/new' },
        { text: 'pending', href: '/orders/pending' },
        { text: 'history', href: '/orders/history' },
    ]},
    { text: 'account', href: '#', subLinks: [
        { text: 'profile', href: '/account/profile' },
        { text: 'sign out', href: '/account/signout' },
    ]},
];

topMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return; 

    let clickedLink = event.target;
    console.log(clickedLink.textContent); // Log the link text

    // Toggling the active class
    topMenuLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');

    // Toggling the submenu
    let linkObject = menuLinks.find(link => link.text.toLowerCase() === clickedLink.textContent.toLowerCase());
    if (!linkObject || !linkObject.subLinks) {
        subMenuEl.style.top = '0'; // Hide submenu for non-subLink items
    } else {
        subMenuEl.style.top = clickedLink.classList.contains('active') ? '100%' : '0';
        buildSubmenu(linkObject.subLinks);
    }
});

function buildSubmenu(subLinks) {
   subMenuEl.innerHTML = ''; // Clear current submenu
   subLinks.forEach(link => {
       let anchorEl = document.createElement('a');
       anchorEl.setAttribute('href', link.href);
       anchorEl.textContent = link.text;
       subMenuEl.appendChild(anchorEl);
   });
}

subMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return; 

    let clickedSubLink = event.target;
    console.log(clickedSubLink.textContent); // Log the link text
    subMenuEl.style.top = '0'; // Hide the submenu
    topMenuLinks.forEach(link => link.classList.remove('active')); // Clear active from top menu

    // Update mainEl content
    mainEl.innerHTML = `<h1>clickedSubLink.textContent</h1>`;
});