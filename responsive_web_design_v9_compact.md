# Certification Responsive Web Design (HTML/CSS) - Version Compacte

# HTML

## basic-html

### Step 1
HTML stands for HyperText Markup Language. It's the code that defines the structure and content of a webpage. This is your code editor, where you'll write HTML.

Find line 1 in the editor and type this text:

```md
Welcome to freeCodeCamp
```

When you are done, click the "check your code" button to see if it's correct.

---

### Step 4
An `h1` element is the main heading of a webpage and you should only use one per page. `h2` elements represent subheadings. You can have multiple per page and they look like this:

```html
<h2>This is a subheading.</h2>
```

Turn the `Full-Stack Curriculum` text into an `h2` element by surrounding it with opening and closing `h2` tags.

---

### Step 6
When you need to add a paragraph to a webpage, you can use the `p` element like this:

```html
<p>This is a paragraph element.</p>
```

Turn `Learn the skills to become a full-stack developer` into a paragraph element.

---

### Step 7
There are six heading elements in HTML: `h1` through `h6`. They're used to show the importance of sections on your webpage, with `h1` being the most important and `h6` the least.

Below your `p` element, add an `h3` heading with the text:

```md
Introduction to HTML
```

---

### Step 8
Notice that each heading looks a little different in the preview. Same with the paragraph.

Next, add another `p` element that displays the following text:

```md
HTML represents the content and structure of a webpage
```

---

### Step 9
You're getting the hang of it. Next, add another `h3` element at the bottom of the editor with the text:

```md
Introduction to CSS
```

---

### Step 11
Finally, JavaScript makes your webpage interactive — it lets you tell the page what to do when someone clicks a button, submits a form, or many other things.

For the last step of the workshop, add another `h3` and `p` element to the page describing JavaScript.

First, add an `h3` element with the text:

```md
Introduction to JavaScript
```

Then, below that `h3` element, add a `p` element with the following text:

```md
JavaScript adds interactivity to a webpage
```

---

### Step 2
HTML is made up of elements. The first one you will use is the `h1` element:

```html
<h1>Welcome to freeCodeCamp</h1>
```

It starts with an opening tag (`<h1>`), ends with a closing tag (`</h1>`), and has the text it will display in between the tags.

Turn your `Welcome to freeCodeCamp` text into an `h1` element by adding an opening tag in front of it, and a closing tag after it.

---

### Step 3
Notice that the HTML you write in the editor shows up in the preview. In this workshop, you will write the HTML for a partial curriculum webpage.

Below your `h1` element, type the following on the empty line:

```md
Full-Stack Curriculum
```

---

### Step 5
Below the other two lines of text, add:

```md
Learn the skills to become a full-stack developer
```

---

### Step 10
While HTML defines the structure and content of a webpage, CSS is used to add style — things like colors, fonts, spacing, and layout.

Below the `h3` you just added, add another paragraph element with the text:

```md
CSS is used to style a webpage
```

---

### Debug Camperbot's Profile Page
Camperbot is trying to build a profile page. They asked a friend to look over their code and they said it has some errors.

Your job is to fix all of Camperbot's errors so they can continue building their profile page. Complete the items in the user stories below and click "Check Your Code" to see if you fixed all the errors.

**User Stories:**

1. Camperbot is trying to use a `heading2` element, but that element does not exist. Fix those tags so it uses a correct second-level heading element.
2. Camperbot is trying to add two paragraphs with `pp`, but those don't exist either. Fix them so they use correct paragraph tags.
3. Camperbot is using an `h3` element for the `Background and Interests` subheading but it has a syntax error. Spot the issue and resolve it.

---

### What Role Does HTML Play on the Web?


---

### What Are Attributes, and How Do They Work?


---

### Debug a Pet Adoption Page
Sally, a pet adoption store owner, has built her first web page but there are some issues.

Your job is to fix all of the errors so Sally can continue building her page. 

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. Sally wants to use an image of some cats but it is not displaying correctly. You will need to fix the following in the `img` element:
   - Replace the `href` attribute with the correct attribute for the image source. 
   - Replace the `att` attribute with the correct attribute representing short, descriptive text for images.
   - Remove the `</img>` closing tag because `img` elements are void elements and don't have closing tags.
2. Sally wants to use some links to direct users to the dog and cat pages. But the links are not working correctly. You will need to fix the following in the `a` elements:
   - Replace both `src` attributes with the correct attributes used to specify URLs.

---

### What Is the Role of the Link Element in HTML, and How Can It Be Used to Link to External Stylesheets?
Let's learn about the `link` element, and how to use it to link to external stylesheets.

The `link` element is used to link to external resources like stylesheets and site icons. Here is the basic syntax for using the `link` element for an external CSS file:

```html
<link rel="stylesheet" href="./styles.css" />
```

The `rel` attribute is used to specify the relationship between the linked resource and the HTML document. In this situation, we need to specify that this linked resource is a `stylesheet`.

It is considered best practice to separate your HTML and CSS in different files. Developers will use the `link` element for their external CSS file instead of writing everything in the HTML document.

The `href` attribute is used to specify the location of the URL for the external resource. 

The `dot` followed by a forward slash in the example tells the computer to look in the current folder, or directory, for the `styles.css` file.

The `link` element should be placed inside the `head` element as seen in the following example:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Examples of the link element</title>
  <link rel="stylesheet" href="./styles.css" />
</head>
```

Often times you will see multiple `link` elements inside a professional codebase that link to different stylesheets, fonts, and icons. Here is an example of using the `link` element to link to an external Google Font called *Playwright Cuba*:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@100..400&display=swap"
  rel="stylesheet"
/>
```

Google Fonts are a set of free and open source custom fonts that you can use inside any project. You can choose which fonts you would like to use and Google will provide you with the necessary HTML and CSS code. In this example, the `preconnect` value for the `rel` attribute tells the browser to create an early connection to the value specified in the `href` attribute. This is done to speed up loading times for these external resources.

Another common use case for the `link` element is to link to icons. Here is an example of linking to a favicon:

```html
<link rel="icon" href="favicon.ico" />
```

A favicon, which is short for favorite icon, is a small icon typically displayed in the browser tab next to the site title. A lot of websites will use a favicon to display their brand icon.

# --questions--

## --text--

What is the role of the `link` element in HTML?

## --answers--

It specifies the content type of the linked resource.

### --feedback--

Pay close attention to the name of this element because it will give you clue as to what it does.

---

It determines the visibility of the linked resource on the webpage.

### --feedback--

Pay close attention to the name of this element because it will give you clue as to what it does.

---

It defines the font size of the linked resource when displayed.

### --feedback--

Pay close attention to the name of this element because it will give you clue as to what it does.

---

It is used to link to external resources like stylesheets and site icons.

## --video-solution--

4

## --text--

What is the role of the `rel` attribute inside the `link` element?

## --answers--

It is used to indicate the language of the linked document.

### --feedback--

The `rel` attribute represents a relationship.

---

It is used to specify the relationship between the linked resource and the HTML document.

---

It is used to define the media type of the linked document.

### --feedback--

The `rel` attribute represents a relationship.

---

It is used to determine the size of the linked document.

### --feedback--

The `rel` attribute represents a relationship.

## --video-solution--

2

## --text--

What is a favicon?

## --answers--

A type of JavaScript file used to enhance website functionality.

### --feedback--

Look closely at the name since it will imply what a favicon is.

---

A type of font used to style text on a website.

### --feedback--

Look closely at the name since it will imply what a favicon is.

---

A small icon typically displayed in the browser tab next to the site title.

---

A security feature used to prevent cross-site scripting attacks.

### --feedback--

Look closely at the name since it will imply what a favicon is.

## --video-solution--

3

---

### What Is an HTML Boilerplate, and Why Is It Important?
Let's learn about the HTML boilerplate.

What is the HTML boilerplate, you ask? It's like a ready-made template for your webpages. Think of it as the foundation of a house. A boilerplate includes the basic structure and essential elements every HTML document needs. It saves you time and helps ensure your pages are set up properly. Here is an example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
       name="viewport"
       content="width=device-width, initial-scale=1.0" />
    <title>freeCodeCamp</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
  </body>
</html>
```

Let's break down the key parts of this boilerplate. First, there is the `DOCTYPE` declaration:

```html
<!DOCTYPE html>
```

It tells browsers which version of HTML you're using. Next, comes the `html` tag:

```html
<!DOCTYPE html>
<html lang="en">
  <!--All other elements go inside here-->
</html>
```

This wraps around all your content, and can specify the language of your page. Inside the `html` tag, you'll find two main sections - a `head`, and a `body`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!--Important metadata goes here-->
  </head>
  <body>
    <!--Headings, paragraphs, images, etc. go inside here-->
  </body>
</html>
```

The `head` section contains important behind-the-scenes information:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document Title Goes Here</title>
  <link rel="stylesheet" href="./styles.css" />
</head>
```

Your site's metadata, contained in `meta` elements, has details about things like character encoding, and how websites like Twitter should preview your page's link. Your site's title, found in the `title` element, determines the text that appears in the browser tab or window. Finally, you'll typically link your page's external stylesheets in the `head` section using `link` elements.

The `body` section is where all your content goes:

```html
<body>
  <h1>I am a main title</h1>
  <p>Example paragraph text</p>
</body>
```

Now, why is a boilerplate important? It ensures your pages are structured correctly and work well across different browsers. Using a boilerplate helps you avoid common mistakes and follow best practices. It's a great starting point for any web project. Remember, you can customize your own boilerplate to fit your needs. As you gain experience, you might add your own preferred elements or `meta` tags. As you continue to improve your personal boilerplate, you'll find that it saves you time when starting new projects.

Next time you start a new HTML file, consider using a boilerplate. It will definitely give you a solid foundation to build on.

# --questions--

## --text--

Where would you set the character encoding for your page?

## --answers--

A `meta` element in the `body`.

### --feedback--

Character encoding is metadata information.

---

A `head` element in the `body`.

### --feedback--

Character encoding is metadata information.

---

A `meta` element in the `head`.

---

In the `DOCTYPE`.

### --feedback--

Character encoding is metadata information.

## --video-solution--

3

## --text--

Where would you set the language for your page?

## --answers--

In the opening `html` tag.

---

A `meta` element in the `body`.

### --feedback--

This is an attribute on the outer-most element.

---

A `head` element in the `body`.

### --feedback--

This is an attribute on the outer-most element.

---

A `meta` element in the `head`.

### --feedback--

This is an attribute on the outer-most element.

## --video-solution--

1

## --text--

What purpose does a boilerplate serve?

## --answers--

Provides a starting structure for your websites.

### --feedback--

A boilerplate is helpful in many ways.

---

Ensures you are not missing any essential elements.

### --feedback--

A boilerplate is helpful in many ways.

---

Allows you to get started writing the content of your page faster.

### --feedback--

A boilerplate is helpful in many ways.

---

All of the above.

## --video-solution--

4

---

### What Is UTF-8 Character Encoding, and Why Is It Needed?
UTF-8, or UCS Transformation Format 8, is a standardized character encoding widely used on the web. Character encoding is the method computers use to store characters as data. Essentially, all text on a web page is a sequence of characters stored as one or more bytes. In computing, a byte is a unit of data consisting of 8 bits, or binary digits. UTF-8 supports every character in the Unicode character set - and this includes characters and symbols from all writing systems, languages, and technical symbols. Here is an example of using the `meta` element with the `charset` attribute to set the character encoding to `UTF-8`:

```html
<meta charset="UTF-8" />
```

By setting the character encoding to UTF-8, it will ensure that the accented `"e"` character (`é`) is displayed correctly on the page. Here is an extended code example of using the UTF-8 character encoding:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Examples of the UTF-8 encoding</title>
  </head>
  <body>
    <p>Café</p>
  </body>
</html>
```

For each new project you create, you should include this `meta` element with the `charset` attribute set to `UTF-8`.

# --questions--

## --text--

Which attribute is used to set the UTF-8 character encoding for HTML documents?

## --answers--

`pattern`

### --feedback--

Refer back to the examples showing which attribute to use.

---

`content`

### --feedback--

Refer back to the examples showing which attribute to use.

---

`charset`

---

`lang`

### --feedback--

Refer back to the examples showing which attribute to use.

## --video-solution--

3

## --text--

What is character encoding?

## --answers--

A method computers use to store characters as data.

---

A way to compress text files.

### --feedback--

Think about what computers do with characters.

---

It determines the font used to display text on a screen.

### --feedback--

Think about what computers do with characters.

---

It refers to the process of converting spoken language into written text.

### --feedback--

Think about what computers do with characters.

## --video-solution--

1

## --text--

How many bits are inside of a byte?

## --answers--

1

### --feedback--

Refer back to the information about bytes and bits.

---

33

### --feedback--

Refer back to the information about bytes and bits.

---

7

### --feedback--

Refer back to the information about bytes and bits.

---

8

## --video-solution--

4

---

### Step 1
In this workshop, you will continue working with basic HTML elements like headings, paragraphs, and lists by building a cat photo app. 

Begin the workshop by adding an `h1` element with the text of `CatPhotoApp`.

---

### Step 2
Below the `h1` element, add an `h2` element with this text:

`Cat Photos`

---

### Step 3
Create a `p` element below your `h2` element and give it the following text:

`Everyone loves cute cats online!`

---

### Step 4
Commenting allows you to leave messages without affecting the browser display. It also allows you to make code inactive. A comment in HTML starts with `<!--`, contains any number of lines of text, and ends with `-->`. 

Here is an example of a comment with the `TODO: Remove h1`:

```html
<!-- TODO: Remove h1 -->
```

Add a comment above the `p` element with this text:

`TODO: Add link to cat photos`

---

### Step 5
HTML5 has some elements that identify different content areas. These elements make your HTML easier to read and help with Search Engine Optimization (SEO) and accessibility.

The `main` element is used to represent the main content of the body of an HTML document. Content inside the `main` element should be unique to the document and should not be repeated in other parts of the document.

```html
<main>
  <h1>Most important content of the document</h1>
  <p>Some more important content...</p>
</main>
```

Identify the main section of this page by adding a `<main>` opening tag before the `h1` element, and a `</main>` closing tag after the `p` element.

---

### Step 6
In the previous step, you put the `h1`, `h2`, comment, and `p` elements inside the `main` element. This is called *nesting*. Nested elements should be placed two spaces further to the right of the element they are nested in. This spacing is called indentation and it is used to make HTML easier to read.

Here is an example of nesting and indentation:

```html
<main>
  <h1>Most important content of the document</h1>
  <p>Some more important content...</p>
</main>
```

The `h1` element, `h2` element and the comment are indented two spaces more than the `main` element in the code below. Use the space bar on your keyboard to add two more spaces in front of the `p` element so that it is indented properly as well.

---

### Step 7
You can add images to your website by using the `img` element. `img` elements have an opening tag without a closing tag. An element without a closing tag is known as a <dfn>void element</dfn>.

Add an `img` element below the `p` element. At this point, no image will show up in the browser.

---

### Step 8
HTML <dfn>attributes</dfn> are special words used inside the opening tag of an element to control the element's behavior. The `src` attribute in an `img` element specifies the image's URL (where the image is located).

Here is an example of an `img` element with a `src` attribute pointing to the freeCodeCamp logo:

```html
<img src="https://cdn.freecodecamp.org/platform/universal/fcc_secondary.svg">
```

Inside the existing `img` element, add a `src` attribute with this URL:

`https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg`

---

### Step 9
All `img` elements should have an `alt` attribute. The `alt` attribute's text is used for screen readers to improve accessibility and is displayed if the image fails to load. 

Here is an example of an `img` element with an `alt` attribute:

```html
<img src="cat.jpg" alt="A cat">
```

Inside the `img` element, add an `alt` attribute with this text:

`A cute orange cat lying on its back`

---

### Step 10
You can link to another page with the anchor (`a`) element. 

Here is an example linking to `https://www.freecodecamp.org`:

```html
<a href="https://www.freecodecamp.org"></a>
```

Add an anchor element after the paragraph that links to `https://freecatphotoapp.com`. At this point, the link won't show up in the preview.

---

### Step 11
A link's text must be placed between the opening and closing tags of an anchor (`a`) element.

Here is an example of a link with the text `click here to go to freeCodeCamp.org`:

```html
<a href="https://www.freecodecamp.org">click here to go to freeCodeCamp.org</a>
```

Add the anchor text `cat photos` to the anchor element. This will become the link's text.

---

### Step 15
To open links in a new tab, you can use the `target` attribute on the anchor (`a`) element. 

The `target` attribute specifies where to open the linked document. `target="_blank"` opens the linked document in a new tab or window.

Here is the basic syntax for an `a` element with a `target` attribute:

```html
<a href="https://www.freecodecamp.org" target="_blank">freeCodeCamp</a>
```

Add a `target` attribute with the value `_blank` to the `cat photos` anchor (`a`) element's opening tag, so that the link opens in a new tab.

---

### Step 17
In previous steps, you used an anchor element to turn text into a link. Other types of content can also be turned into a link by wrapping it in anchor tags. 

Here is an example of turning an image into a link:

```html
<a href="example-link">
  <img src="image-link.jpg" alt="A photo of a cat.">
</a>
```

Turn the image into a link by surrounding it with necessary element tags. Use `https://freecatphotoapp.com` as the anchor's `href` attribute value.

---

### Step 20
Within the second `section` element, add a new `h2` element with the text `Cat Lists`.

---

### Step 21
When you add a lower-rank heading element to the page, it's implied that you're starting a new subsection.

After the last `h2` element of the second `section` element, add an `h3` element with this text:

`Things cats love:`

---

### Step 22
To create an unordered list of items, you can use the `ul` element.

After the `h3` element with the `Things cats love:` text, add an unordered list (`ul`) element. Note that nothing will be displayed at this point.

---

### Step 23
The `li` element is used to create a list item in an ordered or unordered list.

Here is an example of list items in an unordered list:

```html
<ul>
  <li>milk</li>
  <li>cheese</li>
</ul>
```

Within the `ul` element nest three list items to display three things cats love:

`catnip`

`laser pointers`

`lasagna`

---

### Step 24
After the unordered list, add a new image with a `src` attribute value set to:

`https://cdn.freecodecamp.org/curriculum/cat-photo-app/lasagna.jpg`

And its `alt` attribute value to:

`A slice of lasagna on a plate.`

---

### Step 25
The `figure` element represents self-contained content and will allow you to associate an image with a caption.

Nest the image you just added within a `figure` element.

---

### Step 26
A figure caption (`figcaption`) element is used to add a caption to describe the image contained within the `figure` element. 

Here is an example of a `figcaption` element with the caption of `A cute cat`:

```html
<figure>
  <img src="image.jpg" alt="A description of the image">
  <figcaption>A cute cat</figcaption>
</figure>
```

After the image nested in the `figure` element, add a `figcaption` element with text set to:

`Cats love lasagna.`

---

### Step 27
To place emphasis on a specific word or phrase, you can use the `em` element. 

Emphasize the word `love` in the `figcaption` element by wrapping it in an emphasis `em` element.

---

### Step 28
After the `figure` element, add another `h3` element with the text:

`Top 3 things cats hate:`

---

### Step 29
The code for an ordered list (`ol`) is similar to an unordered list, but list items in an ordered list are numbered when displayed.

Below the `h3` element, add an ordered list with these three list items:

`flea treatment`
`thunder`
`other cats`

---

### Step 30
After the ordered list, add another `figure` element.

---

### Step 34
The `strong` element is used to indicate that some text is of strong importance or urgent.

In the `figcaption` you just added, indicate that `hate` is of strong importance by wrapping it in a `strong` element.

---

### Step 35
The `footer` element is used to define a footer for a document or section. A footer typically contains information about the author of the document, copyright data, links to terms of use, contact information, and more.

After the `main` element, add a `footer` element.

---

### Step 36
Nest a `p` element with the text `No Copyright - freeCodeCamp.org` within the `footer` element.

---

### Step 37
Turn the existing `freeCodeCamp.org` text into a link by enclosing it in an anchor (`a`) element. The `href` attribute should be set to `https://www.freecodecamp.org`.

---

### Step 38
Notice that everything you've added to the page so far is inside the `body` element. All page content elements that should be rendered to the page go inside the `body` element. However, other important information goes inside the `head` element.

The `head` element is used to contain metadata about the document, such as its title, links to stylesheets, and scripts. Metadata is information about the page that isn't displayed directly on the page.

Add a `head` element above the `body` element.

---

### Step 39
The `title` element determines what browsers show in the title bar or tab for the page.

Add a `title` element within the `head` element using the text below: 

`CatPhotoApp`

---

### Step 40
Notice that the entire contents of the page are nested within an `html` element. The `html` element is the root element of an HTML page and wraps all content on the page.

You can also specify the language of your page by adding the `lang` attribute to the `html` element. 

Add the `lang` attribute with the value `en` to the opening `html` tag to specify that the language of the page is English.

---

### Step 41
All pages should begin with `<!DOCTYPE html>`. This special string is known as a <dfn>declaration</dfn> and ensures the browser tries to meet industry-wide specifications.

`<!DOCTYPE html>` tells browsers that the document is an HTML5 document which is the latest version of HTML.

Add this declaration as the first line of the code.

---

### Step 31
Inside the `figure` element you just added, nest an `img` element with a `src` attribute set to `https://cdn.freecodecamp.org/curriculum/cat-photo-app/cats.jpg`.

---

### Step 32
To improve the accessibility of the image you added, add an `alt` attribute with the text:

`Two tabby kittens sleeping together on a couch.`

---

### Step 33
After the last `img` element, add a `figcaption` element with the text `Cats hate other cats.`

---

### Step 18
Before adding any new content, you should make use of a `section` element to separate the cat photos content from the future content.

The `section` element is used to define sections in a document, such as chapters, headers, footers, or any other sections of the document. It is a semantic element that helps with SEO and accessibility.

```html
<section>
  <h2>Section Title</h2>
  <p>Section content...</p>
</section>
```

Take your `h2` element, two `p` elements, and anchor (`a`) element and nest them in a `section` element.

---

### Step 19
It is time to add a new section. Add a second `section` element below the existing `section` element.

---

### Step 42
You can set browser behavior by adding `meta` elements in the `head`. Here's an example:

```html
<meta attribute="value">
```

Inside the `head` element, nest a `meta` element with a `charset` attribute set to the value of `utf-8`. This tells the browser how to encode characters for the page. 

Note that the `meta` element is a void element.

With that last change, you have completed the Cat Photo App workshop. Congratulations!

---

### Step 13
Add `p` tags to turn `See more <a href="https://freecatphotoapp.com">cat photos</a> in our gallery.` into a paragraph.

---

### Step 14
Turn the existing text `cute cats` into an anchor element that links to:

`https://cdn.freecodecamp.org/curriculum/cat-photo-app/running-cats.jpg`

---

### Step 16
Now that you have added the link you can remove the comment.

---

### Step 12
Add the words `See more ` before the anchor element and ` in our gallery` after the anchor element.

---

### Build a Recipe Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `!DOCTYPE html` declaration.
1. You should have an `html` element with `lang` set to `en`.
1. You should have a `head` element containing a `title` element with the name of your recipe, and a `meta` element with a `charset` attribute set to `UTF-8`.
1. You should have a `body` element.
1. You should have an `h1` element with the name of your recipe.
1. You should have a `p` element that introduces the recipe below the `h1`.
1. You should have one `h2` element with the text `Ingredients` for the ingredients section.
1. You should have an unordered list (`ul` element) with at least four list items (`li` elements) that lists your ingredients below the first `h2` element.
1. You should have a second `h2` element with the text `Instructions` for the instructions section.
1. You should have an ordered list (`ol` element) with at least four list items that lists the recipe steps in order, below the second `h2`.
1. You should have one `img` element with a `src` attribute set to a valid image, you can use `https://cdn.freecodecamp.org/curriculum/labs/recipe.jpg` if you would like, and an `alt` attribute describing the image.

---

### What are Div Elements and When Should You Use Them?


---

### What Are IDs and Classes, and When Should You Use Them?


---

### What Are HTML Entities, and What Are Some Common Examples?


---

### What Is the Role of the Script Element in HTML, and How Can It Be Used to Link to External JavaScript Files?


---

### Step 4
In this step add an `h1` element with the text `XYZ Bookstore`.

---

### Step 5
Below the `h1` element, add a `p` element with this text: `Browse our collection of amazing books!`.

---

### Step 6
The `div` element is used as a container to group other HTML elements. You will mainly use the `div` element when you want to group HTML elements that will share a set of CSS styles.

Below the `p` element, add a `div` element. This `div` will be a container for your book cards.

**Note**: This workshop does not apply CSS. Classes and grouped elements are useful for CSS styling, but in this workshop they are used only to structure and group content. You will learn how styling works in a later module.

---

### Step 7
The `class` attribute is used to identify one or more elements for styling. Unlike the `id` attribute, class names do not need to be unique: multiple elements can share the same class.

Here is an example:

```html
<p class="example">example paragraph</p>
```

Add a `class` attribute to your `div` element and set its value to `card-container`.

---

### Step 8
You can add multiple elements inside a `div` element to group related content. Inside the element having a `class` of `card-container`, create another `div` element. This `div` will represent the first book card.

Add a `class` attribute to this new `div` element and set the value of the `class` attribute to `card`.

---

### Step 9
The `id` attribute adds a unique identifier to an HTML element. Each `id` should be unique within a page and should only be used once.

`id` values cannot contain spaces and should only contain letters, digits, underscores, and dashes.

Here is an example:

```html
<p id="para">example paragraph</p>
```

Add an `id` attribute to your element having a class of `card` and set its value to `sally-adventure-book`.

---

### Step 10
Inside the first element having a class of `card`, add an `h2` element with the text `Sally's SciFi Adventure`.

---

### Step 11
Below the `h2` element in the first element having a class of `card`, add a `p` element with the following text:

```md
This is an epic story of Sally and her dog Rex as they navigate through other worlds.
```

---

### Step 12
The `button` element is used to create clickable buttons on a webpage. Buttons are interactive elements that users can click to perform actions.

Add a `button` element inside the element that has a `class` of `card`, give the button a `class` attribute set to `btn`, and the text `Buy Now`.

---

### Step 13
Now create a second book card. Add another `div` element with the `class` attribute set to `card`. Notice how you can reuse the same class name for multiple elements to apply consistent styling.

---

### Step 14
Add an `id` attribute to your second element having a class of `card` and set its value to `dave-cooking-book`. Remember that each `id` must be unique.

---

### Step 15
Inside the second element having a class of `card`, add an `h2` element with the text `Dave's Cooking Adventure`.

---

### Step 16
Below the `h2` element in the second card, add a `p` element with this text:

```md
This is the story of Dave as he learns to cook everything from pancakes to pasta, one recipe at a time.
```

---

### Step 17
Inside the second card, add a `button` element with the `class` attribute set to `btn` and the text `Buy Now`.

Both `button` elements now share the same `class`, which means they can be styled consistently together.

---

### Step 18
Remember, an HTML element looks like this:

```html
<element attribute="value">
    inner text
</element>
```

Below the element with the class `card-container`, add a new `p` element with this text:

```md
Review your selections and continue to checkout.
```

Below the `p` element, create a `div` element with the `class` attribute set to `btn-container`. This container will group your navigation button elements.

---

### Step 19
Inside the element with a class of `btn-container`, add two `button` elements:

First button:

- Id: `view-cart-btn`
- Class: `btn`
- Text: `View Cart`

Second button:

- Id: `checkout-btn`
- Class: `btn`
- Text: `Checkout`

Congratulations! You have successfully built the structure of a bookstore page using divs, classes, and ids to organize your content.

---

### Step 1
In this workshop, you will build a bookstore page by creating book cards that display information about different books. You'll practice organizing content using `div` elements, classes, and IDs.

Start your bookstore page by creating the HTML boilerplate.

Add the `<!DOCTYPE html>` declaration and `html` and `head` elements.

Add a `lang` attribute to the `html` element and set it to `"en"`.

---

### Step 3
Now, improve the structure of your HTML document to ensure your page is encoded correctly.

Inside the `head` element, add the `<meta charset="UTF-8">` element.

Lastly, add a `body` element below the `head` section. This is where all of your visible page content will go.

---

### Step 2
Add the `title` element inside the `head` element. 

Set the page title to `XYZ Bookstore Page`.

---

### What Is the Role of the Meta Description, and How Does It Affect SEO?
SEO, or Search Engine Optimization, is a practice that optimizes web pages so they become more visible and rank higher on search engines. One way to improve your site's SEO, is to provide a short description for the web page using the `meta` element. Here is an example of using the meta element to set a page description for a gardening site:

```html
<meta
  name="description"
  content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
```

By setting the `name` attribute to `description`, it ensures that browsers, search engines, and other web tools correctly interpret this metadata. The `content` attribute is where you will place your description. It is recommended that you keep your descriptions short and concise. This is because search engines will often truncate the description based on the results page layout.

Similar to other types of `meta` elements, the `meta` description will not be visible on the web page itself. One place where the page description can be found is in the search engine results page snippet. Here are some examples of page result snippets for freeCodeCamp's subreddit and GitHub repositories:

```sh
r\FreeCodeCamp: This is the official subreddit for the freeCodeCamp.org community. Learn to
code for free together with millions of other people...
```

```sh
Our full-stack web development and machine learning curriculum is completely free and self-
paced. We have thousands of interactive coding challenges to help you...
```

In the examples, each of the page descriptions are located just beneath the site links. Within a couple of seconds, users can get a general sense of what the page is about and decide to click on the links for more information.

Even though `meta` descriptions won't directly affect a site's ranking on search engine, having a strong description could result in more traffic to your website.

# --questions--

## --text--

Which element is used to set the description for a web page?

## --answers--

`img`

### --feedback--

Look closely to the title of this lesson.

---

`meta`

---

`slot`

### --feedback--

Look closely to the title of this lesson.

---

`figure`

### --feedback--

Look closely to the title of this lesson.

## --video-solution--

2

## --text--

What does SEO stand for?

## --answers--

Slot Engine Optimization

### --feedback--

Refer back to where SEO was talked about.

---

Site Enhancement Outreach

### --feedback--

Refer back to where SEO was talked about.

---

Social Engagement Optimization

### --feedback--

Refer back to where SEO was talked about.

---

Search Engine Optimization

## --video-solution--

4

## --text--

Where does the page's description typically show up?

## --answers--

Inside the `figure` element.

### --feedback--

Refer back to where there are examples showing where the page's descriptions typically show up.

---

Inside the `footer` element.

### --feedback--

Refer back to where there are examples showing where the page's descriptions typically show up.

---

In the search engine results page.

---

In a popup alert message.

### --feedback--

Refer back to where there are examples showing where the page's descriptions typically show up.

## --video-solution--

3

---

### What Is the Role of Open Graph Tags, and How Do They Affect SEO?
The open graph protocol enables you to control how your website's content appears across various social media platforms, such as Facebook, LinkedIn, and many more. By setting these open graph properties, you can entice users to want to click and engage with your content. You can set these properties through a collection of `meta` elements inside your HTML `head` section.

The first important OG property to include would be the `title`. Here is an example of setting the OG `title` for the freeCodeCamp homepage:

```html
<meta content="freeCodeCamp.org" property="og:title" />
```

For the `property` attribute, you will need to specify that it is `og:title`. The `content` attribute is where you will write the title you want displayed for social media sites.

The next important OG property would be the `type`. Here is an example of using the OG `type` for the freeCodeCamp homepage:

```html
<meta property="og:type" content="website" />
```

The `type` property is used to represent the type of content being shared on social media. Examples of this content include articles, websites, videos, or music.

The third important OG property would be the `image`. Here is an example of setting the OG `image` for the freeCodeCamp homepage:

```html
<meta
  content="https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png"
  property="og:image"
/>
```

In this example, the open graph image is pointing to the freeCodeCamp logo. All of these images should be high quality with good dimensions and ratios. Most social media platforms will include criteria for image requirements to help you ensure that your content displays well on their site. For example, the developers.facebook.com documentation page states:

"use images that are at least 1200 by 630 pixels for the best display on high resolution devices. At the minimum, you should use images that are 600 by 315 pixels to display link page posts with larger images."

The fourth important OG property would be the `url`. Here is an example of setting the OG `url` for the freeCodeCamp homepage:

```html
<meta property="og:url" content="https://www.freecodecamp.org" />
```

There are many more OG properties that you can set, like `description`, `audio`, `video` and `locale`. However, the open graph `url`, `image`, `type`, and `title` are the most important ones to include.

So how do these open graph properties affect Search Engine Optimization? When your content is shared on social media, well-crafted OG properties can enhance the appearance for your content in users' feeds. This can lead to higher click-through rates which could signal to search engines that your content is relevant and engaging.

# --questions--

## --text--

What are open graph properties used for?

## --answers--

For embedding interactive multimedia content directly into web pages.

### --feedback--

Refer back to where open graph properties were introduced.

---

To set how your website's content will be seen on different social media platforms.

---

For generating dynamic pop-up advertisements on websites.

### --feedback--

Refer back to where open graph properties were introduced.

---

For encrypting sensitive data transmitted between web servers and users' browsers.

### --feedback--

Refer back to where open graph properties were introduced.

## --video-solution--

2

## --text--

What does the `property="og:title"` do in the `meta` element?

## --answers--

It automatically adjusts the font size and style of the webpage title based on user preferences.

### --feedback--

Pay close attention to the value of the `property` attribute here because it heavily implies what that value does.

---

It directs the browser to display a specific emoticon or emoji as the title of the webpage.

### --feedback--

Pay close attention to the value of the `property` attribute here because it heavily implies what that value does.

---

It causes the webpage to play a specific audio file when the title is displayed in the browser tab.

### --feedback--

Pay close attention to the value of the `property` attribute here because it heavily implies what that value does.

---

It specifies the title of your web page content when it is shared on social media platforms.

## --video-solution--

4

## --text--

What does the `property="og:type"` do in the `meta` element?

## --answers--

It selects the page's default font style.

### --feedback--

Pay close attention to the value of the `property` attribute here because it heavily implies what that value does.

---

It triggers a pop-up advertisement when the webpage is loaded.

### --feedback--

Pay close attention to the value of the `property` attribute here because it heavily implies what that value does.

---

It specifies the type of content used for your web page when it is shared on social media platforms.

---

It changes the webpage's background color based on the user's time zone.

### --feedback--

Pay close attention to the value of the `property` attribute here because it heavily implies what that value does.

## --video-solution--

3

---

### Build a Travel Agency Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `DOCTYPE` declaration.
1. You should have an `html` element with `lang` set to `en`.
1. You should have a `head` element containing a `meta` void element with `charset` set to `utf-8` and a `title` with the text `Travel Agency Page`.
1. You should have a `meta` tag in your `head` element that contains a short description of your website for SEO.
1. You should have an `h1` element to present your travel destinations.
1. You should have a paragraph below the `h1` element introducing the travel opportunities.
1. You should have an `h2` element with the text `Packages`.
1. You should have a `p` element introducing briefly the various packages.
1. You should have an unordered list element with two list items. The two list items should have the text `Group Travels` and `Private Tours`, respectively. The text of each list item should be enclosed by an anchor element.
1. You should have an `h2` element with the text `Top Itineraries`.
1. You should have at least three `figure` elements, each containing an anchor element and a `figcaption` element.
1. The three anchor elements should have an `img` element with an appropriate `alt` attribute and a `src` attribute set to a valid image as their content. You can use `https://cdn.freecodecamp.org/curriculum/labs/colosseo.jpg`, `https://cdn.freecodecamp.org/curriculum/labs/alps.jpg`, and `https://cdn.freecodecamp.org/curriculum/labs/sea.jpg` if you would like.
1. All your five anchor elements should have an `href` attribute with the value of `https://www.freecodecamp.org/learn` and a `target` attribute with the value of `_blank`.

---

### What Are the Roles of the HTML Audio and Video Elements, and How Do They Work?


---

### Step 1
In this workshop, you will build an HTML music player. The HTML boilerplate has been provided for you.

Create an `h1` element and give it the text `freeCodeCamp Tunes`.

---

### Step 2
Below the `h1`, add an `h2` element with the text `Can't Stay Down`, this is the title of the first song.

Below the `h2` element add a `p` element with the text `Artist: Quincy Larson`.

---

### Step 3
Next, create an `audio` element below the `p` element. Over the next few steps, you will add the necessary attributes to make the audio element play music.

---

### Step 5
The `loop` attribute will restart the audio once playback is completed. Think of an internet meme that repeats playback. Omitting the `loop` attribute will make the audio play once.

The `loop` attribute is a boolean attribute and does not need a value.

Add the `loop` attribute to the `audio` element.

---

### Step 4
To specify the media resource for the audio, you will need to add the `src` attribute to the `audio` element.

Add the `src` attribute with the value `https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3`.

---

### Step 6
The `controls` attribute provides playback controls including pause/resume playback, seeking, and volume control for the `audio` element. 

The `controls` attribute is a boolean attribute and does not need a value.

Add the `controls` attribute to the `audio` element.

Now you should see the `audio` element displayed on the page.

---

### Step 7
Add a new `h2` element below the `audio` element with the text `Cruising for a Musing`.

Below the `h2`, add a `p` element with the text `Artist: Quincy Larson`.

---

### Step 8
Below the `p` element, add an `audio` element, give it an `src` attribute with a value of `https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3`, and the `loop` and `controls` attributes.

---

### Step 9
The last song is titled `Scratching the Surface`, the artist is Quincy Larson, and the file to use is `https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3`.

Add the last song to complete the music player following the same pattern you used for the first two songs.

---

### Step 1
In this workshop, you will build an HTML video player. The HTML boilerplate has been provided for you.

Create an `h1` element and give it the text `Working with the HTML Video Element`.

---

### Step 2
Next, create a `video` element below the `h1`. Over the next few steps, you will add the necessary attributes to make the video player functional.

---

### Step 3
In a previous lesson, you learned about different attributes available to the `video` element. The `width` attribute determines the width of the video in pixels.

Add the `width` attribute to the `video` element with a value of `640`.

---

### Step 4
The `loop` attribute will restart the video once playback is completed. Think of an internet meme that repeats playback. Omitting the `loop` attribute will make the video playback once.

The `loop` attribute is a boolean attribute and does not need a value.

Add the `loop` attribute to the `video` element.

---

### Step 5
The `controls` attribute provides playback controls including playback, rewind, and volume control for the `video` element. 

The `controls` attribute is a boolean attribute and does not need a value.

Add the `controls` attribute to the `video` element.

Now you should see the `video` element displayed on the page.

---

### Step 6
The `muted` attribute will silence audio on initial playback. If you have `controls` enabled, the user will be able to unmute audio. Omitting the `muted` attribute will play audio on initial playback.

The `muted` attribute is a boolean attribute and does not need a value.

Add the `muted` attribute to the `video` element.

---

### Step 7
The `poster` attribute is a thumbnail image of the video. Think of the videos you watch on YouTube. It's displayed while the video is downloading. If the attribute is omitted, the first video frame is shown during the download phase.

Now, add the `poster` attribute with the value `https://cdn.freecodecamp.org/curriculum/labs/past-event2.jpg` to your `video` element.

---

### Step 8
You might have noticed you didn't link to the actual video. You will do that in the next phase. When it comes to video file types, there are differences in browser support. To accommodate this, you can use `source` elements inside the `video` element and the browser will select the first compatible `source`.

Here is an example of a `source` element:

```html
<video controls width="250">
  <source src="src-url-goes-here" type="video-type-goes-here" />
</video>
```

The `source` element is a void element so it does not have a closing tag. 

Add a `source` element inside of your `video` element.

---

### Step 9
To specify the media resource for the video, you will need to add the `src` attribute to the `source` element.

Add the `src` attribute with the value `https://cdn.freecodecamp.org/curriculum/labs/what-is-the-map-method-and-how-does-it-work.mp4`.

---

### Step 10
You have used a video file with an `mp4` file extension, and you need to tell the browser that so it knows how to read the file.

You will use the `type` attribute to specify the `video/mp4` MIME type.

MIME (Multipurpose Internet Mail Extensions) is a standard to describe documents in other forms besides ASCII text, for example, audio, video, and images.

MP4, formally known as MPEG-4 Part 14, is a digital multimedia container format. It is widely used for storing video and audio, but it can also include other data types like subtitles and still images. MP4 files are designed for streaming over the Internet and are compatible with many devices and platforms.

Now, add the `type` attribute and the value `video/mp4`.

---

### Step 11
Another common MIME type is the `video/webm` MIME type.

WebM is an open-source audiovisual media file format developed by Google, primarily designed for web-based media content. It supports video codecs like VP8, VP9, and AV1, and audio codecs such as Vorbis and Opus, making it a popular choice for HTML5 video and audio elements.

Below your first `source` element, add another `source` element and give it a `src` attribute with the value `https://cdn.freecodecamp.org/curriculum/labs/mapmethod.webm` and a `type` attribute with the value `video/webm`.

---

### Step 12
Another common MIME type is the `video/ogg` MIME type.

Ogg is a digital multimedia container format designed to provide for efficient streaming and manipulation of digital multimedia. It is maintained by the Xiph.Org Foundation and is free and open, unrestricted by software patents. Its name is derived from "ogging", jargon from the computer game Netrek.

Below your second `source` element, add a third `source` element and give it a `src` attribute with the value `https://cdn.freecodecamp.org/curriculum/labs/mapmethod.ogg` and a `type` attribute with the value `video/ogg`.

---

### Step 13
The last `source` element you will add will be for the `video/quicktime` MIME type.

QuickTime is an extensible multimedia architecture created by Apple, which supports playing, streaming, encoding, and transcoding a variety of digital media formats. Not as popular as the MP4 format, you may need it for legacy application support.

Below your third `source` element, add a fourth `source` element and give it a `src` attribute with the value `https://cdn.freecodecamp.org/curriculum/labs/mapmethod.mov` and `type` attribute with the value `video/quicktime`.

Congratulations! You completed the HTML Video Player Workshop.

---

### Build an HTML Audio and Video Player
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have an `h1` element for the main title of the page.
2. You should have two `section` elements.
3. Inside the first `section` element, you should have an `h2` element for the title of the video playing.
4. Below the `h2` element, you should have a `video` element with `controls` and `width` attributes. The `width` attribute should be set to `640`.
5. Inside the `video` element, you should have a `source` element with a `src` attribute pointing to a video file and a `type` attribute.
   - You can use `https://cdn.freecodecamp.org/curriculum/labs/what-is-the-map-method-and-how-does-it-work.mp4`.
6. Inside the second `section` element, you should have an `h2` element for the title of the song playing.
7. Below the `h2` element, you should have an `audio` element with the `controls` and `loop` attributes, and a `src` attribute that points to an audio file.
   - You can use `https://cdn.freecodecamp.org/curriculum/js-music-player/sailing-away.mp3`.
   - Or `https://cdn.freecodecamp.org/curriculum/js-music-player/we-are-going-to-make-it.mp3`.

---

### What Are Common Ways to Optimize Media Assets?
There are three tools to consider when using media, such as images, on your web pages: the size, the format, and the compression.

Let's talk about the size of your images first. When you are building a website, you'll often style images to display in a specific size. For example, you might have an image display at a 640x480 resolution. 640 represents the width while 480 represents the height in pixels. When preparing your image you want to scale it to a 640x480 size to match that styling. If you serve an image that is 1920x1080 but you are styling it to be much smaller, you're requiring your users to download unnecessary data. A smaller resolution results in a smaller file size.

The next thing to consider is your file format. Two of the most common file formats are PNG and JPG, but these are no longer the most ideal formats for serving images. Unless you need support for older browsers, you should consider using a more optimized format, like WEBP or AVIF.

Finally, you can run compression algorithms on your images to reduce file size. Tools like pngcrush work well for lossless formats like PNG, which can be compressed without any quality loss since the original data can be perfectly reconstructed. However, not all formats are lossless. JPG, for example, uses lossy compression — each time a JPG is re-saved or re-compressed, some image data is permanently discarded, resulting in degraded quality. You should keep all these things in mind when selecting and preparing images for your web pages.

# --questions--

## --text--

How should you scale, or size, your images?

## --answers--

Your images should be smaller than the rendered size on the page.

### --feedback--

Using a mismatched size can create loading or display issues.

---

Your images should be larger than the rendered size on the page.

### --feedback--

Using a mismatched size can create loading or display issues.

---

Your images should be the same scale as the rendered size on the page.

---

It doesn't matter, use whatever size you'd like.

### --feedback--

Using a mismatched size can create loading or display issues.

## --video-solution--

3

## --text--

Which of the following is NOT a valid image file type?

## --answers--

TS

---

PNG

### --feedback--

Review the middle of the lesson to see which of these options was not mentioned.

---

JPG

### --feedback--

Review the middle of the lesson to see which of these options was not mentioned.

---

WEBP

### --feedback--

Review the middle of the lesson to see which of these options was not mentioned.

## --video-solution--

1

## --text--

Which file format uses lossy compression, meaning re-saving or re-compressing it degrades image quality?

## --answers--

WEBP

### --feedback--

This format can use both lossy and lossless compression, so it is not specifically known for degrading image quality.

---

PNG

### --feedback--

This format uses lossless compression, so compressing it would not result in a degraded quality.

---

JPG

---

GIF

### --feedback--

This format uses lossless compression, so compressing it would not result in a degraded quality.

## --video-solution--

3

---

### What Are the Different Types of Image Licenses, and How Do They Work?
Images are considered intellectual property, this means that they are protected by copyright regulations, most often belonging to the creator. By default, images are released as all rights reserved. The creator, or publisher sometimes, holds all copyright for the image.

This means that you cannot use them in your web page unless you do one of three things: obtain written permission from the copyright holder, purchase a license from the copyright holder, or incorporate the image in a way that falls under fair use.

That third point is a bit tricky. Fair use requires that your use of the image is both limited and transformative. Some examples of fair use would be to comment on or review the art or create a parody of the image.

Some images might be released under a permissive license, like a Creative Commons license, or the BSD license that freeCodeCamp uses. These images are available for use in your website, but you'll need to read the license to understand the rules you need to follow when using these images. For example, you might be required to make your website open source, or you may not be permitted to modify the image in any way.

Finally, some images may be released to the public domain. An image under the public domain has no copyright attached to it and is free to be used without any restrictions. Images licensed specifically under the Creative Commons 0 license are considered public domain.

Most search engines will allow you to filter image results by a license. There are also sites like Pixabay and Unsplash, which offer free-to-use images. Always be mindful of the copyright and licensing when you use an image in your website.

# --questions--

## --text--

What is the default license for images?

## --answers--

All rights reserved

---

Permissive license

### --feedback--

Review the beginning of the lesson to obtain the answer.

---

Public Domain

### --feedback--

Review the beginning of the lesson to obtain the answer.

---

Creative Commons

### --feedback--

Review the beginning of the lesson to obtain the answer.

## --video-solution--

1

## --text--

Which license releases works to the public domain?

## --answers--

MIT

### --feedback--

It's a specific Creative Commons license.

---

BSD

### --feedback--

It's a specific Creative Commons license.

---

Creative Commons

### --feedback--

It's a specific Creative Commons license.

---

Creative Commons 0

## --video-solution--

4

## --text--

How can you find images that you are allowed to use?

## --answers--

Search for images on Google and use them freely.

### --feedback--

Review the end of the lesson to obtain the answer.

---

Use websites like Pixabay or Unsplash.

---

Use any image from social media as long as you give credit.

### --feedback--

Review the end of the lesson to obtain the answer.

---

You can use any image as long as it's not watermarked.

### --feedback--

Review the end of the lesson to obtain the answer.

## --video-solution--

2

---

### What Are SVGs, and When Should You Use Them?


---

### Step 1
In a previous lesson, you learned about `svg` elements and how they're often used as icons in projects. In real-world codebases, you would typically rely on icon libraries, so you don't need to create `svg` elements from scratch. However, in this workshop, you'll build a heart icon to learn about the core attributes used inside an `svg` element.

Start by creating an `svg` element on the page.

---

### Step 2
You should nest one `path` element inside your `svg` element to give the image shape.

Create a `path` element.

---

### Step 3
The `path` element needs its shape defined. That is where the `d` attribute comes in. It is used to create a series of command letters and numbers that draw a shape. 

These letters represent commands like move to, draw line, and close, while the numbers represent coordinates.  

Set the heart shape's `d` attribute to `M12 21s-6-4.35-9.33-8.22C-.5 7.39 3.24 1 8.4 4.28 10.08 5.32 12 7.5 12 7.5s1.92-2.18 3.6-3.22C20.76 1 24.5 7.39 21.33 12.78 18 16.65 12 21 12 21z`.

---

### Step 4
The next step is to set the `width` and `height` attributes for the `svg` element. As you are creating an icon, both values should be set small.

Set both values to `24`.

---

### Step 5
You are getting closer, now look at this example:

```html
<svg viewBox="0 0 50 50">
</svg>
```

The `viewBox` attribute controls what part of the image is visible inside the SVG.

- The first two numbers (`0 0`) set the starting position of the `viewBox` — the top-left corner (x and y). 
- The next two numbers (`50 50`) define the `viewBox`'s width and height.

Set the `viewBox` attribute to `0 0 24 24`.

---

### Step 6
The heart icon is almost done. You just need to color it red. To do that, set the `svg` element's
`fill` attribute to `red`.

Congrats on finishing this workshop!

---

### What Are Replaced Elements, and What Are Some Examples?


---

### How Do You Embed Videos onto Your Page Using the iframe Element?


---

### Step 1
In this workshop, you will use the `iframe` element to display a video. The basic HTML boilerplate has been prepared for you.

Begin by creating an `h1` element with the text `iframe Video Display`.

---

### Step 2
Now, create an `iframe` element. Don't put anything in it yet.

---

### Step 3
In the first lesson on the `iframe` element, you learned it's a replaced element just like `img`. That means it can also take the `width` and `height` properties to determine how tall and wide it should be.

Give your `iframe` element a `width` of `560` and a `height` of `315`.

---

### Step 4
The `iframe` element also takes an `src` attribute with a value that indicates the URL or the path of the resource to display.

Add an `src` attribute of `https://www.youtube.com/embed/I0_951_MPE0` to your `iframe` element.

At this point, you should see the video displaying on the page, but there are some more attributes you need to add.

---

### Step 5
One of the attributes is `allow`. It's like a permission list that tells the browser what features the `iframe` is allowed to use.

Here's an `iframe` element with the `allow` attribute:

```html
<iframe
  allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture web-share"
></iframe>
```

Add the `allow` attribute with the value `accelerometer`, `autoplay`, and `clipboard-write`.

`accelerometer` lets the `iframe` use motion sensors so it can detect things like device tilting and rotation. `autoplay` lets the video start playing automatically, and `clipboard-write` lets the iframe write data to the user’s clipboard.

---

### Step 6
Add `encrypted-media`, `gyroscope`, and `web-share` to the existing values in the `allow` attribute.

These three will allow the use of encrypted media extensions to protect the video, grant access to the device’s motion and orientation sensors, and allow sharing the iframe content through the device's native share dialogs.

---

### Step 7
The next attribute you'll add is `referrerpolicy`. It is the rule that determines how much detail you share when your page connects to another page.

Add the `referrerpolicy` attribute and set it to `strict-origin-when-cross-origin`. This shares the full address on the same site, only the site name on other sites, and nothing on insecure sites.

---

### Step 8
Last but not least, the attribute you will add is `allowfullscreen`. As it implies, it allows the video to be viewed in full screen mode.

With that, the workshop is completed!

---

### Build a Video Compilation Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `main` element as the only child of the `body` element.
1. You should have an `h1` element with the topic of your page.
1. You should have a paragraph introducing the topic of your page below your `h1` element.
1. You should have three `section` elements below your first paragraph.
1. Each section should contain an `h2` element, a paragraph, and an `iframe` element, in this order.
1. The three `iframe` elements should have a `src` attribute set to a valid video.
1. Each `iframe` element should also have a `title` attribute to describe the embedded content, and a `height` attribute and a `width` attribute to set the element to a proper size.

---

### What Are the Different Target Attribute Types, and How Do They Work?


---

### What Is the Difference Between Absolute and Relative Paths?
A path is a string that specifies the location of a file or directory in a file system. In web development, paths let developers link to resources like images, stylesheets, scripts, and other web pages. There are absolute and relative paths - both are essential when specifying file locations within a file system. Let's look at the two so you can decide which one of them to use and when.

An absolute path is a complete link to a resource. It starts from the root directory, includes every other directory, and finally the filename and extension. The "root directory" refers to the top-level directory or folder in a hierarchy.

If you are linking to a resource on your local machine, use an absolute path, which includes the full directory location of the file. Here's how to link to the `about.html` file with an absolute path:

```html
<p>
  Read more on the
  <a
    href="/Users/user/Desktop/fCC/script-code/absolute-vs-relative-paths/pages/about.html"
    >About Page</a
    >
</p>
```

It looks like this because we are starting from the root and going into a folder called `Users`, then into a folder called `user`, then into a folder called `Desktop`, then into a folder called `fCC`, then into a folder called `script-code`, then into a folder called `absolute-vs-relative-paths`, then into a folder called `pages` to finally get the `about.html` file.

An absolute URL is a complete address used to access a resource. It includes the protocol - which could be `http`, `https`, and `file` and the domain name if the resource is on the web. Here's an example of an absolute URL that links to the freeCodeCamp logo:

```html
<a href="https://design-style-guide.freecodecamp.org/img/fcc_secondary_small.svg">
  View fCC Logo
</a>
```

In this example, the protocol is `https`, the domain name is `design-style-guide.freecodecamp.org`, and the filename is `fcc_secondary_small.svg`.

Here's what the absolute URL looks like in the browser address bar:

```sh
file:///Users/user/Desktop/fCC/script-code/absolute-vs-relative-paths/pages/about.html
```

The URL includes the protocol, `file://`. It also includes the path, which looks like this: `/Users/user/Desktop/fCC/script-code/absolute-vs-relative-paths/pages/`, and represents the series of folders that lead to the file. And finally, it also includes the `about.html`, which is the filename and the extension.

An absolute path shows the full location of a file within a file system and is commonly used for resources on a local machine. An absolute URL includes access information - such as the protocol and, for web resources, the domain name - which tells the browser how and where to retrieve the resource.

Now, let's look at the relative path. A relative path specifies the location of a file relative to the directory of the current file. It does not include the protocol or the domain name, making it shorter and more flexible for internal links within the same website. Here's an example of linking to the `about.html` page from the `contact.html` page, both of which are in the same folder:

```html
<p>
  Read more on the
  <a href="about.html">About Page</a>
</p>
```

So imagine you are on the `contact.html` page, and because the `about.html` page is in the same place, you simply get the filename. This is an example of using a relative file path.

So, which should you use and when: an absolute path, an absolute URL, or a relative path? Here are the rules you should follow:

- Use absolute paths when you want to reference a resource from a fixed location, such as from the root of your site or a known directory on your local machine.

- Use absolute URL when linking to a resource hosted on an external website.

- Use relative paths when linking to resources within the same website.

- Use relative paths if you want to keep your code cleaner and easier to maintain during development.

- Use relative paths during local testing to ensure links work without an internet connection.

# --questions--

## --text--

What are the two types of paths?

## --answers--

Resolute and absolute paths.

### --feedback--

One type starts from the root and the other depends on the current location.

---

Absolute and ultimate paths.

### --feedback--

One type starts from the root and the other depends on the current location.

---

Relative and unique paths.

### --feedback--

One type starts from the root and the other depends on the current location.

---

Absolute and relative paths.

## --video-solution--

4

## --text--

How do you link to a resource available only on the internet?

## --answers--

Absolute URL.

---

Absolute path.

### --feedback--

Think about the path that has to have an `http` or `https` protocol.

---

Relative path.

### --feedback--

Think about the path that has to have an `http` or `https` protocol.

---

Both relative and absolute paths.

### --feedback--

Think about the path that has to have an `http` or `https` protocol.

## --video-solution--

1

## --text--

Which protocol is used for an absolute URL on a local machine?

## --answers--

`http://`

### --feedback--

Think about the protocol for accessing local files.

---

`https://`

### --feedback--

Think about the protocol for accessing local files.

---

`file://`

---

`localhost`

### --feedback--

Think about the protocol for accessing local files.

## --video-solution--

3

---

### What Is the Difference Between Slashes, a Single Dot, and Double Dot in Path Syntax?
You may have seen links like `/public/logo.png`, `./script.js`, or `../styles.css` before. But what do these special types of links mean? These are called file paths. There are three key syntaxes to know. First is the slash, which can be a backslash (`\`) or forward slash (`/`) depending on your operating system. The second is the single dot (`.`). And finally, we have the double dot (`..`).

The slash is known as the "path separator". It is used to indicate a break in the text between folder or file names. This is how your computer knows that `naomis-files/` points to a directory of that same name, while `naomis/files/` points to a `files` directory in the `naomis` directory.

A single dot points to the current directory, and two dots point to the parent directory. You will typically see a single dot used to ensure that the path is recognized as a relative path. Remember that you learned in a previous lesson about relative versus absolute paths before.

Double dots, however, are much more common to access files outside of the current working directory.

For example, given this file tree:

```sh
my-app/
├─ public/
│  ├─ favicon.ico
│  ├─ index.html
├─ src/
│  ├─ index.css
│  ├─ index.js
```

If your `public/index.html` file needed to load the `favicon.ico` file, you would use a relative path with a single dot to access the current directory: `./favicon.ico`. If your `public/index.html` file needed to load the `index.css` file, you would use a relative path with double dots to navigate to the parent `my-app` directory first, then to the `src` directory, and finally to your file: `../src/index.css`.

# --questions--

## --text--

Which option is an absolute path?

## --answers--

`/public/styles.css`

---

`./script.js`

### --feedback--

An absolute path starts with a slash.

---

`../src/nav.html`

### --feedback--

An absolute path starts with a slash.

---

`https://freecodecamp.org`

### --feedback--

An absolute path starts with a slash.

## --video-solution--

1

## --text--

Which option is a relative path to the current directory?

## --answers--

`/public/styles.css`

### --feedback--

A single dot points to the current directory.

---

`./script.js`

---

`../src/nav.html`

### --feedback--

A single dot points to the current directory.

---

`https://freecodecamp.org`

### --feedback--

A single dot points to the current directory.

## --video-solution--

2

## --text--

Which option is a relative path to the parent directory?

## --answers--

`/public/styles.css`

### --feedback--

A double dot points to the parent directory.

---

`./script.js`

### --feedback--

A double dot points to the parent directory.

---

`../src/nav.html`

---

`https://freecodecamp.org`

### --feedback--

A double dot points to the parent directory.

## --video-solution--

3

---

### What Are the Different Link States, and Why Are They Important?


---

### Basic HTML Review


---

### Basic HTML Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

How does the `loop` attribute work inside the `audio` element?

#### --distractors--

It allows the `audio` element to synchronize playback with other multimedia elements on the webpage.

---

It adjusts the pitch and tone of the audio.

---

It triggers the `audio` element to stop and restart playback in a random sequence.

#### --answer--

It starts the audio again once it is finished.

### --question--

#### --text--

What is a void element in HTML?

#### --distractors--

An element used to embed videos on the screen.

---

An element for displaying lists.

---

An element used for embedding sound into the document.

#### --answer--

An element without any content or an end tag.

### --question--

#### --text--

Which of the following is a correct value for the `id` attribute?

#### --distractors--

`id="main@content"`

---

`id="main content"`

---

`id="main~content"`

#### --answer--

`id="main-content"`

### --question--

#### --text--

How does `target="_parent"` work?

#### --distractors--

It opens a link in a new browsing context.

---

It specifies the position within the linked document where the browser should scroll to after clicking the link.

---

It redirects the user to a different website specified in the `href` attribute.

#### --answer--

It opens a link in the parent of the current context.

### --question--

#### --text--

What is the difference between a boolean and regular attribute?

#### --distractors--

Boolean attributes can only be used with checkboxes, while regular attributes are used with radio buttons.

---

Regular attributes are always required for images, while boolean attributes are optional.

---

Boolean attributes must always have a value assigned to them, while regular attributes do not need values assigned to them.

#### --answer--

A boolean attribute can be present or absent, while a regular attribute always has a specified value.

### --question--

#### --text--

Which element is used to link scripts to your HTML file?

#### --distractors--

`img`

---

`ul`

---

`h2`

#### --answer--

`script`

### --question--

#### --text--

What is an HTML boilerplate?

#### --distractors--

A special tool used by web developers to add watermarks to documents.

---

A type of markup language.

---

A plugin that automatically generates "lorem ipsum" text on the page.

#### --answer--

A template that includes all of the essential information needed for an HTML document.

### --question--

#### --text--

Which attribute applies a unique identifier to an HTML element?

#### --distractors--

`class`

---

`href`

---

`action`

#### --answer--

`id`

### --question--

#### --text--

What is an HTML entity (character reference)?

#### --distractors--

A graphical representation of a character in HTML.

---

A special formatting tag used in HTML.

---

An image used to represent a character in web design.

#### --answer--

A set of characters used to represent a reserved character in HTML.

### --question--

#### --text--

What is the purpose of the `audio` element?

#### --distractors--

It is used to allow users to record their voice directly on a webpage.

---

It is used to style `audio` and `video` elements on the page.

---

It is used to make text on a webpage audible when clicked.

#### --answer--

It is used to add audio to the HTML document.

### --question--

#### --text--

Which of the following is NOT an example of an HTML element?

#### --distractors--

`img`

---

`h1`

---

`link`

#### --answer--

`byte`

### --question--

#### --text--

What is the role of the `target` attribute inside anchor elements?

#### --distractors--

It defines the color of the link when it is hovered over by the user.

---

It specifies the position within the linked document where the browser should scroll to after clicking the link.

---

It determines the font size of the anchor text inside the `link` element.

#### --answer--

It is used to specify where the linked document will be opened when the user clicks on the link.

### --question--

#### --text--

What is an absolute path?

#### --distractors--

A path that is relative to the current file.

---

A path that includes variables.

---

A path that includes wildcard characters.

#### --answer--

A complete path to a resource, starting from the root directory.

### --question--

#### --text--

What is the role of the `link` element in HTML?

#### --distractors--

It's used to create hyperlinks within the same webpage.

---

It's used to define the layout and structure of a webpage.

---

It's used to embed audio or video files into a webpage.

#### --answer--

It's used to link to external resources like stylesheets and site icons.

### --question--

#### --text--

Which of the following is a valid value for working with open graph properties?

#### --distractors--

`"og:socialMedia"`

---

`"og:mediaOG"`

---

`"og:openGraph"`

#### --answer--

`"og:title"`

### --question--

#### --text--

Which of the following is an example of a boolean attribute?

#### --distractors--

`href`

---

`src`

---

`width`

#### --answer--

`checked`

### --question--

#### --text--

Which of the following is a correct syntax for the `img` element?

#### --distractors--

`<img src="image.jpg" alt="Description of the image"></img>`

---

`<img source="image.jpg" desc="Description of the image"></img>`

---

`<img src="image.jpg" desc="Description of the image">`

#### --answer--

`<img src="image.jpg" alt="Description of the image">`

### --question--

#### --text--

What is the `iframe` element used for?

#### --distractors--

It's used to add captions to images.

---

It's used to add copyright information for media.

---

It's used to create hyperlinks within the same webpage.

#### --answer--

It's used to embed another document within the current HTML document.

### --question--

#### --text--

Which of the following is NOT a valid link state for anchor elements?

#### --distractors--

`hover`

---

`visited`

---

`active`

#### --answer--

`href`

### --question--

#### --text--

What is the role of the `title` element?

#### --distractors--

An element that allows users to edit the source code of a webpage.

---

It defines the layout and positioning of elements within a web page.

---

It's used to embed videos and multimedia content directly into an HTML document.

#### --answer--

It specifies the title for a document and appears in the browser tab or window.

## --quiz--

### --question--

#### --text--

Which of the following `target` attributes opens a link in the parent of the current context?

#### --distractors--

`_blank`

---

`_self`

---

`_unfencedTop`

#### --answer--

`_parent`

### --question--

#### --text--

Which attribute is used to set the `UTF-8` character encoding for an HTML document?

#### --distractors--

`accept`

---

`capture`

---

`enctype`

#### --answer--

`charset`

### --question--

#### --text--

What is the role of HTML on the web?

#### --distractors--

HTML is used for style and layout.

---

HTML is used to add interactivity on the page.

---

HTML is a registry for software packages.

#### --answer--

HTML represents the content and structure for a web page.

### --question--

#### --text--

Which image license works for the public domain?

#### --distractors--

JPG

---

Creative Commons.

---

BSD

#### --answer--

Creative Commons 0.

### --question--

#### --text--

How do you set a boolean attribute to `false`?

#### --distractors--

By setting the attribute value to `0`.

---

By using the `not` operator before the attribute name.

---

By setting the attribute to an empty string (`""`).

#### --answer--

By omitting the attribute from the element.

### --question--

#### --text--

What is the `script` element used for?

#### --distractors--

It's used to embed CSS into the HTML document or link to an external CSS file.

---

It's used to embed Pascal code into the HTML document.

---

It's used to embed C# code into the HTML document.

#### --answer--

It's used to embed JavaScript into the HTML document or link to an external JavaScript file.

### --question--

#### --text--

Which of the following elements is used to set the title for an HTML document?

#### --distractors--

`footer`

---

`section`

---

`figcaption`

#### --answer--

`title`

### --question--

#### --text--

What is the `class` attribute typically used for?

#### --distractors--

It's used to embed metadata about the element.

---

It's used to define inline styles directly within the HTML tag.

---

It's used to specify unique identifiers for JavaScript functions.

#### --answer--

It's used to apply a set of styles to multiple elements.

### --question--

#### --text--

Which of the following is NOT an example of a commonly used HTML entity?

#### --distractors--

`&quot;` (Double quote).

---

`&copy;` (Copyright symbol).

---

`&gt;` (Greater than Symbol).

#### --answer--

`&div;` (div element).

### --question--

#### --text--

Which element is used to add audio to your HTML document?

#### --distractors--

`media`

---

`video`

---

`hr`

#### --answer--

`audio`

### --question--

#### --text--

Where is the content represented on the page placed in an HTML document?

#### --distractors--

In between the `head` and the `body` elements.

---

Within the `repr` element.

---

Within the `script` element.

#### --answer--

Within the `body` element.

### --question--

#### --text--

Which attribute is used to start the audio again once it is finished?

#### --distractors--

`multiple`

---

`inputmode`

---

`enctype`

#### --answer--

`loop`

### --question--

#### --text--

Which of the following is the correct syntax for a `div` element?

#### --distractors--

`<<div>>block container<</div>>`

---

`>>div>>block container>>div>>`

---

`[div]block container[/div]`

#### --answer--

`<div>block container</div>`

### --question--

#### --text--

How does `target="_self"` work?

#### --distractors--

It specifies the position within the linked document where the browser should scroll to after clicking the link.

---

It automatically downloads the linked document to the user's computer.

---

It redirects the user to a different website specified in the `href` attribute.

#### --answer--

It opens a link in the current browsing context.

### --question--

#### --text--

What is a relative path?

#### --distractors--

It specifies the exact location of a file or directory from the root directory of the file system.

---

It includes the full URL starting from the domain name to the specific file or directory.

---

It always begins with a forward slash (`/`) indicating the root directory of the website or file system.

#### --answer--

It specifies the location of a file or directory relative to the current working directory.

### --question--

#### --text--

Which of the following elements is the correct syntax for a `link` element?

#### --distractors--

`<link rel="stylesheet" href="./styles.css"></link>`

---

`</link rel="stylesheet" href="./styles.css"></link>`

---

`<<link rel="stylesheet" href="./styles.css"></link>>`

#### --answer--

`<link rel="stylesheet" href="./styles.css" />`

### --question--

#### --text--

Which of the following is NOT a valid value for working with open graph properties?

#### --distractors--

`"og:title"`

---

`"og:type"`

---

`"og:image"`

#### --answer--

`"og:socialMedia"`

### --question--

#### --text--

Which of the following is the correct syntax for a paragraph element?

#### --distractors--

`>p>paragraph element>/p>`

---

`<<p>>paragraph element<</p>>`

---

`<p>`

#### --answer--

`<p>paragraph element</p>`

### --question--

#### --text--

What does the name of the `iframe` element stand for?

#### --distractors--

Inline Framing

---

Inner Frame

---

Inline video

#### --answer--

Inline Frame

### --question--

#### --text--

What does the active state mean for anchor elements?

#### --distractors--

The link is disabled and cannot be clicked.

---

The mouse cursor is over the link.

---

The link has been visited by the user.

#### --answer--

A user is actively clicking on it.

## --quiz--

### --question--

#### --text--

Which of the following will open the link in a new browser tab?

#### --distractors--

```html
<a target="_parent" href="https://freecatphotoapp.com">cat photos</a>
```

---

```html
<a target="_top" href="https://freecatphotoapp.com">cat photos</a>
```

---

```html
<a target="_self" href="https://freecatphotoapp.com">cat photos</a>
```

#### --answer--

```html
<a target="_blank" href="https://freecatphotoapp.com">cat photos</a>
```

### --question--

#### --text--

Which of the following is a void element?

#### --distractors--

`div`

---

`section`

---

`p`

#### --answer--

`img`

### --question--

#### --text--

Which of the following is the correct way to use HTML entities?

#### --distractors--

`<p>This is an &lt&img /&gt& element</p>`

---

`<p>This is an ;lt&img /;gt& element</p>`

---

`<p>This is an ;lt;img /;gt; element</p>`

#### --answer--

`<p>This is an &lt;img /&gt; element</p>`

### --question--

#### --text--

What is the `ul` element used for in HTML?

#### --distractors--

It is used to group a list of images only.

---

It is used to group a list of links only.

---

It is used to group an ordered list of items.

#### --answer--

It is used to group a bulleted list of items.

### --question--

#### --text--

Which of the following is the correct way to apply multiple classes to an HTML element?

#### --distractors--

```html
<div class="box>>red>>box"></div>
``` 

---

```html
<div class="box<<red<<box"></div>
``` 

---

```html
<div class="box-red-box"></div>
``` 

#### --answer--

```html
<div class="box red-box"></div>
``` 

### --question--

#### --text--

Which of the following elements is used to represent an ordered list of items?

#### --distractors--

`span`

---

`div`

---

`ul`

#### --answer--

`ol` 

### --question--

#### --text--

What are open graph properties used for?

#### --distractors--

These properties are used to embed interactive multimedia content directly into web pages.

---

These properties are used to generate dynamic pop-up advertisements on websites.

---

These properties are used to encrypt sensitive data transmitted between web servers and users' browsers.

#### --answer--

These properties are used to set how a website's content will be seen on different social media platforms. 

### --question--

#### --text--

Which of the following is used to set a short description for a web page?

#### --distractors--

```html
<meta
  add="description"
  content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
``` 

---

```html
<meta
  set="description"
  content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
``` 

---

```html
<meta
  description="description"
  content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
``` 

#### --answer--

```html
<meta
  name="description"
  content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
``` 

### --question--

#### --text--

What does SVG stand for?

#### --distractors--

Scalable Vector Graph

---

Scalable Visitor Graphics

---

Site Vector Graphics

#### --answer--

Scalable Vector Graphics 

### --question--

#### --text--

What is the role of the `footer` element?

#### --distractors--

This element is used to group related captions and images on a web page. 

---

This element is used to create horizontal lines in between paragraphs on the page.

---

This element is used to create a list of ordered items at the bottom of the page. 

#### --answer--

This element is used to group copyright content or related documents at the bottom of the page. 

### --question--

#### --text--

What is `UTF-8` character encoding?

#### --distractors--

It is a standardized character encoding used to set the title for a web page.

---

It is a set of characters used to set the page description for the web page.

---

It is a special set of characters used in elements to improve media performance. 

#### --answer--

It is a standardized character encoding widely used on the web.  

### --question--

#### --text--

Which of the following is an example of a replaced element?

#### --distractors--

`slot`

---

`div`

---

`p`

#### --answer--

`iframe` 

### --question--

#### --text--

Which of the following is considered the most important heading on a web page?

#### --distractors--

`h6`

---

`h3`

---

`h5`

#### --answer--

`h1` 

### --question--

#### --text--

Which of the following elements is used to link to external resources like stylesheets and site icons?

#### --distractors--

`a`

---

`p`

---

`div`

#### --answer--

`link` 

### --question--

#### --text--

Which of the following elements is used to convey a sense of urgency, seriousness or strong importance?

#### --distractors--

`important`

---

`heavy`

---

`strength`

#### --answer--

`strong`

### --question--

#### --text--

What is the role of the `figcaption` element?

#### --distractors--

It provides captions for the content inside a `span` element. 

---

It provides captions for the content inside a `slot` element. 

---

It provides captions for the content inside a `div` element. 

#### --answer--

It provides captions for the content inside a `figure` element. 

### --question--

#### --text--

Which of the following is the correct way to set the `DOCTYPE` declaration for an HTML document?

#### --distractors--

`<DOCTYPE>`

---

`<*DOCTYPE html>`

---

`<<DOCTYPE html>>`

#### --answer--

`<!DOCTYPE html>`

### --question--

#### --text--

What is the purpose of the `head` element in an HTML document?

#### --distractors--

It is a container of anchor elements for the HTML document. 

---

It is a container of images for the HTML document. 

---

It is a container of heading elements for the HTML document. 

#### --answer--

It is a container of metadata for the HTML document. 

### --question--

#### --text--

Which of the following is the correct way to set the language of the HTML document to English?

#### --distractors--

`<html lang-set="en">` 

---

`<html set-lang="en">` 

---

`<html language="en">` 

#### --answer--

`<html lang="en">` 

### --question--

#### --text--

Which of the following elements should NOT be placed inside of the `head`?

#### --distractors--

`link`

---

`meta`

---

`title`

#### --answer--

`img` 

## --quiz--

### --question--

#### --text--

Which of the following is NOT a correct statement about absolute and relative paths?

#### --distractors--

Absolute paths start from the root directory, while relative paths depend on the location of the current file.

---

Relative paths are shorter and more flexible for linking within a website, while absolute paths include the full URL.

---

Both absolute and relative paths can be used to link to files within the same website.

#### --answer--

Relative paths cannot use `..` to move up directories, but absolute paths can.

### --question--

#### --text--

Which of the following is NOT a valid target attribute value in an `a` tag?

#### --distractors--

`_self`

---

`_parent`

---

`_top`

#### --answer--

`_main`

### --question--

#### --text--

What is the purpose of the `controls` attribute in the `audio` element?

#### --distractors--

It defines the audio file format for the browser to use.

---

It automatically starts the audio when the page loads.

---

It specifies the audio file’s source URL.

#### --answer--

It adds built-in playback controls like play, pause, and volume adjustment.

### --question--

#### --text--

Which of the following elements improves SEO by providing a brief description of the web page?

#### --distractors--

```html
<meta
 description="describe"
 content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
```

---

```html
<meta
 name="desc"
 content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
```

---

```html
<meta
 description="description"
 content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
```

#### --answer--

```html
<meta
 name="description"
 content="Discover expert tips and techniques for gardening in small spaces, choosing the right plants, and maintaining a thriving garden."
/>
```

### --question--

#### --text--

What does `<meta charset="utf-8" />` do?

#### --distractors--

Sets the language of the webpage to English.

---

Links an external CSS stylesheet.

---

Specifies the title of the webpage.

#### --answer--

Defines the character encoding to ensure proper text display.

### --question--

#### --text--

What is the difference between `link` and `script` elements in HTML?

#### --distractors--

`link` is for JavaScript files, and `script` is for CSS files.

---

Both `link` and `script` are used to style web pages.

---

`script` is for adding styles, and `link` is for running JavaScript.

#### --answer--

`link` is used to add styles from an external CSS file, while `script` is used to run JavaScript code.

### --question--

#### --text--

Which of the following statements about HTML classes and IDs is incorrect?

#### --distractors--

A class name can be used multiple times throughout an HTML document.

---

The `rel` attribute defines the relationship between the linked resource and the HTML document.

---

The `og:image` property is used to specify the image displayed in social media posts.

#### --answer--

ID names cannot contain underscores and must be unique.

### --question--

#### --text--

Which of the following statements about HTML heading elements is true?

#### --distractors--

The text size increases from `h1` to `h6`.

---

The text size remains the same for all heading elements.

---

`h3` is larger than `h2`.

#### --answer--

The text size decreases from `h1` to `h6`.

### --question--

#### --text--

Which statement is incorrect about HTML elements?

#### --distractors--

HTML elements are the basic building blocks of a webpage.

---

Some codebases include a forward slash (/) inside void elements.

---

A boolean attribute is one that works simply by being present or absent in a tag.

#### --answer--

Void elements contain content and only have a start tag.

### --question--

#### --text--

Which of the following statements about void elements in HTML is true?

#### --distractors--

A void element must always include a forward slash / before closing.

---

A void element should never include a forward slash /.

---

The forward slash / is mandatory for self-closing void elements in all versions of HTML.

#### --answer--

Both `<img>` and `<img/>` are acceptable in modern HTML.

### --question--

#### --text--

What is the primary purpose of comments in programming?

#### --distractors--

To make the code run faster.

---

To change how the browser displays content.

---

To store temporary data within the code.

#### --answer--

To leave notes for yourself and other developers in the code.

### --question--

#### --text--

Which target attribute opens a link in the same browsing context as the current one?

#### --distractors--

`_blank`

---

`_top`

---

`_parent`

#### --answer--

`_self`

### --question--

#### --text--

What is the purpose of the `em` element in HTML?

#### --distractors--

To make text bigger.

---

To change the text color.

---

To underline words for emphasis.

#### --answer--

To convey stress emphasis by making text italic.

### --question--

#### --text--

What does the `strong` element do in HTML?

#### --distractors--

Increases the font size.

---

Changes the text color.

---

Underlines the text.

#### --answer--

Makes text bold to show importance.

### --question--

#### --text--

What is the main difference between the `figure` and `figcaption` elements in HTML?

#### --distractors--

`figure` is used for captions, while `figcaption` is used to group related content like images or diagrams.

---

`figcaption` must always be placed outside the `figure` element.

---

There is no difference; both are used for the same purpose.

#### --answer--

`figure` groups related content like images or diagrams, while `figcaption` provides a caption for that content.

### --question--

#### --text--

Why are HTML entities used?

#### --distractors--

To add styling to text.

---

To create hyperlinks in a webpage.

---

To increase the font size of special characters.

#### --answer--

To represent reserved characters like `<` and `&` in HTML.

### --question--

#### --text--

Which of the following statements about Open Graph tags is correct?

#### --distractors--

Open Graph tags are used to style a webpage with CSS.

---

Open Graph tags are only used for SEO and have no effect on social media.

---

Open Graph tags must be placed inside the `body` section of HTML.

#### --answer--

The `og:title` property sets the title that appears when content is shared on social media.

### --question--

#### --text--

Which of the following statements about image formats is incorrect?

#### --distractors--

WEBP and AVIF are better for modern image optimization.

---

SVG images can scale without losing quality.

---

Compression helps reduce image file sizes.

#### --answer--

PNG and JPG are the best formats for optimized images today.

### --question--

#### --text--

What does the `loop` attribute do in the `audio` element?

#### --distractors--

Plays the audio once.

---

Stops the audio after one play.

---

Slows down the audio playback.

#### --answer--

Repeats the audio continuously.

### --question--

#### --text--

Which of the following best describes an HTML boilerplate?

#### --distractors--

A special tool used by web developers to add watermarks to documents.

---

A browser plugin that speeds up webpage loading.

---

A coding framework exclusively for animations in HTML.

#### --answer--

A predefined template containing essential HTML structure for web development.

---

## semantic-html

### Why Should You Care About Semantic HTML?
Semantics are the meaning of words, or phrases, in a language. In HTML, which is a language, elements have their own semantic meaning too. In fact, you can think of your HTML document like you would a text document. And much like a text document, you might have headings, images, bold text, and other formatting.

The semantic meaning of an element refers to what special information that element conveys. The semantic meaning of a `p` element, for example, is a paragraph of text:

```html
<p>
  Let me tell you about my fantastic holiday in Paris.
  I saw the impressive Eiffel Tower up close!
</p>
```

Most elements have semantic meaning. The `div` element is one of the very few that does not. But why is this important?

First and foremost, using proper semantic HTML will ensure the best experience for users with assistive technology like screen readers. But also, semantic HTML can improve your search rankings. This is referred to as search engine optimization, or SEO.

Finally, using correct semantic elements can improve your development experience. Rather than having to sift through a bunch of `div`s to find your navigation bar, you can edit the `nav` element directly and know what you're changing. Throughout this section, you will learn more about these topics, how to use semantic elements, and why semantic HTML is so important.

# --questions--

## --text--

What does semantic refer to?

## --answers--

Nitpicking the code.

### --feedback--

It has to do with how a language is written or spoken.

---

The meaning and structure of words/phrases in a language.

---

It's a grammar term unrelated to programming.

### --feedback--

It has to do with how a language is written or spoken.

---

Dictionary definitions.

### --feedback--

It has to do with how a language is written or spoken.

## --video-solution--

2

## --text--

Which element does not have semantic meaning?

## --answers--

`div`

---

`h1`

### --feedback--

It's an element used mainly as a container for more elements.

---

`p`

### --feedback--

It's an element used mainly as a container for more elements.

---

`img`

### --feedback--

It's an element used mainly as a container for more elements.

## --video-solution--

1

## --text--

Why should you care about semantic HTML?

## --answers--

It improves SEO.

### --feedback--

There are many reasons.

---

It improves accessibility.

### --feedback--

There are many reasons.

---

It improves developer experience.

### --feedback--

There are many reasons.

---

All of the above

## --video-solution--

4

---

### Why is it Important to Have Good Structural Hierarchy?


---

### What Is the Difference Between Presentational and Semantic HTML?


---

### When Should You Use the Emphasis Element Over the Idiomatic Text Element?


---

### When Should You Use the Strong Element Over the Bring Attention To Element?


---

### What Are Description Lists, and When Should You Use Them?


---

### Step 1
In this workshop, you are going to build a list of major web browsers. The HTML boilerplate has been provided for you.

Start by adding a heading to your page that reads `List of Major Web Browsers` using a `h1` element inside the `body` element.

---

### Step 2
As you recall from an earlier lesson, description lists are used to present terms and definitions in an organized and easy-to-read format. 

Here is an example:

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
```

Below the `h1` element, create a `dl` element. This will hold the list of browsers.

---

### Step 3
Description lists are made up of a list of terms and details. The `dt` element represents the description term, while the `dd` element represents the description detail. 

The first browser you will add to your description list will be for Google Chrome.

Inside your `dl` element, add a `dt` element containing the text `Google Chrome`.

Below your `dt` element, add a `dd` element with the following text:

```md
This is a free web browser developed by Google and first released in 2008.
```

---

### Step 4
Now it is time to add your second browser to the list.

Below your `Google Chrome` entry, add another `dt` element containing the text `Firefox`.

Below your `dt` element, add a `dd` element with the following text:

```md
This is a free web browser developed by the Mozilla Corporation and first created in 2004.
```

---

### Step 5
The third browser you will add to the list will be for the Safari web browser.

Add another `dt` element containing the text `Safari`.

Below your `dt` element, add a `dd` element with the following text:

```md
This browser was developed by Apple and is the default browser for iPhone, iPad and Mac devices.
```

---

### Step 6
Now it is time to add your fourth browser to the list.

Add another `dt` element containing the text `Brave`.

Below your `dt` element, add a `dd` element with the following text:

```md
This is a free web browser first released in 2016 that is based on the Chromium web browser.
```

---

### Step 7
The last browser you will add to the list will be for the Arc browser.

Add another `dt` element containing the text `Arc`.

Below your `dt` element, add a `dd` element with the following text:

```md
This is a free Chromium based web browser first released in 2023 by The Browser Company.
```

With that last addition, your browser list is complete!

---

### How Do Block and Inline Quotes Work in HTML?


---

### How Do You Display Abbreviations in HTML?


---

### How Do You Display Addresses in HTML?


---

### How Do You Display Times and Dates in HTML?


---

### Step 1
In this workshop, you will practice working with semantic HTML by building a web page that includes some of Quincy Larson's tips for landing a developer job. The basic HTML boilerplate has been prepared for you.

Begin by creating an `h1` element with the text `Quincy's Tips for Getting a Developer Job`.

---

### Step 2
Now, create a paragraph element below the `h1` element. Inside this paragraph add the text `Learning to code is hard, but as Quincy Larson says, You can become a developer.`

---

### Step 3
In a previous lesson you learned that the `q` element is used to distinguish quoted text from the surrounding content.

Here is an example:

```html
<p>
  Nancy said, <q>Learning is fun!</q>
</p>
```

Most modern browsers will add quotation marks around an inline quote automatically when you use the `q` element.

Inside the paragraph wrap `You can become a developer.` in an inline quotation element, keeping the rest of the paragraph unchanged.

---

### Step 4
If the source of a quote is a website, you can cite it with the `cite` attribute. The value of this attribute should be a valid URL. While this attribute doesn't change the presentation of the block quote, it's very helpful for giving screen readers and search engines more information about the quote.

Here is an example of an inline quotation element with a `cite` attribute:

```html
<p>
  Nancy said,
  <q cite="https://example.com">Learning is fun!</q>
</p>
```

Add the `cite` attribute to the inline quotation element with this URL:

`https://www.freecodecamp.org/news/learn-to-code-book/`

---

### Step 5
Below the paragraph element, add a `main` element and nest three `section` elements inside it.

---

### Step 6
Inside the first `section` element, add an `h2` element with the text `Envisioning Success`.

---

### Step 7
Below the `h2` element, you will add another quote by Quincy. This time, the quote won't be part of a larger paragraph. Instead, the whole paragraph will be a quote. In order to distinguish quoted text like this, you should use the block quotation element: `blockquote`. In the browser, you'll see that the text is slightly indented.

Here is an example of a block quotation element with quoted text:

```html
<blockquote>
  The first thing you should consider about education is this is an economic decision.
</blockquote>
```

Now, inside the first section, add a block quotation element below the `h2` element with the text `Can you imagine what it would be like to be a successful developer? To have built software systems that people rely upon?`.

---

### Step 8
Exactly like the inline quotation element, you can also add a `cite` attribute to a block quotation element.

Here is an example of a block quotation element with a `cite` attribute:

```html
<blockquote cite="https://www.freecodecamp.org/news/is-college-worth-it/">
  The first thing you should consider about education is this is an economic decision.
</blockquote>
```

Now, add a `cite` attribute to the block quotation element with the URL `https://www.freecodecamp.org/news/learn-to-code-book/`.

---

### Step 9
Below the block quotation element, add a paragraph element with the text `&mdash;Quincy Larson, How to Learn to Code and Get a Developer Job [Full Book]`.

`&mdash;` is an HTML entity that represents an em dash `—`.

---

### Step 10
So far you have been using the `cite` attribute to attribute the source of the quotation, but the attribute doesn't really show the source to the user.

If you want to attribute the source visually, you can add a citation element, `cite`, outside the block quotation element. The citation element is an HTML element that you can use to mark up the title of a referenced creative work, like a book, article, song, film, website, or research paper.

Here's an example:

```html
<div>
  <blockquote cite="https://www.freecodecamp.org/news/is-college-worth-it/">
    The first thing you should consider about education is this is an economic decision.
  </blockquote>
  <p>&mdash;Quincy Larson, <cite>Is College Still Worth it? Tips from my 20 Years in Adult Education</cite></p>
</div>
```

Inside the `p` element below the block quotation element, wrap `How to Learn to Code and Get a Developer Job [Full Book]` in a `cite` element.

---

### Step 11
Inside the second `section` element, nest an `h2` element with the text `Importance of Networking`.

Below this heading, add a block quotation element with a `cite` attribute with the value `https://www.freecodecamp.org/news/learn-to-code-book/`.

---

### Step 12
You can write quoted text directly within the block quotation element, like you did in the first `section` element. Alternatively, you can wrap it within one or more paragraph elements. This is helpful when the text has multiple paragraphs, but you want to keep them within the same block quotation element.

Here's an example with two paragraphs:

```html
<blockquote cite="https://www.freecodecamp.org/news/is-college-worth-it/">
  <p>So many people ask me each week: is college still worth it? In this 1-hour video I answer this question and other commonly asked questions about university.</p>
  <p>I've been in adult education for two decades at this point, and even though I'm not a labor market economist, I do feel confident enough to answer these questions.</p>
</blockquote>
```

In the second section, inside the existing block quotation element, add four `p` elements with the following texts, in order:

- `So much of getting a job is who you know.`
- `It's OK to be an introvert, but you do need to push your boundaries.`
- `Create GitHub, Twitter, LinkedIn, and Discord accounts.`
- `Go to tech meetups and conferences. Travel if you have to.`

---

### Step 13
In the third and last `section` element, you are going to create the same HTML structure as you did in the preceding section.

First, inside the last section, add an `h2` element with the text `Importance of Building a Reputation`.

Then, below the `h2` element, add a block quotation element with a `cite` attribute set to `https://www.freecodecamp.org/news/learn-to-code-book/`.

Lastly, nest three paragraph elements inside the block quotation element with the following texts, in order:

1. `Share short video demos of your projects.`
2. `Keep applying to speak at bigger and bigger conferences.`
3. `Hang out at hackerspaces and help people who are even newer to coding than you.`

Congratulations! With this you have finished this workshop.

---

### How Do You Display Mathematical Equations and Chemical Formulas in HTML?


---

### How Do You Represent Computer Code in HTML?


---

### What Are the U, S, and Ruby Elements Used For, and How Do They Work?


---

### Step 1
In this workshop, you will practice working with semantic HTML by building a blog page dedicated to Mr. Whiskers the cat. 

The first section you will build out is the page <dfn>header</dfn>. 

The `header` element is used to represent introductory content like page navigation and other introductory information. 

Here is an example using the `header` element:

```html
<header>
  <h1>Main Page Title Goes Here</h1>
  <img src="example-logo.png" alt="Example logo" />
</header>
```

Inside the `body` element, add a `header` element.

---

### Step 3
In this introductory content, you will want to show an image of Mr. Whiskers with a caption.

Below the `h1` element, start by adding a `figure` element.

Inside the `figure` element, add an `img` element.

The `src` attribute of the `img` should have a value of `"https://cdn.freecodecamp.org/curriculum/css-photo-gallery/1.jpg"` and the `alt` text should have a value of `"a cat in the garden"`.

Below your `img` element, add a `figcaption` with the text `Mr. Whiskers in the Garden`.

---

### Step 4
For your blog, there should be a way for users to navigate to different sections on the page.

The `nav` element is used to provide navigation links to other sections in the document or other sections in the website. A lot of times you will see the `nav` element used for menus or table of contents. 

Here is an example of using the `nav` element:

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

Below your `figure` element, add a `nav` element with a `ul` element nested inside.

Inside the `ul` element, add three `li` elements.

---

### Step 5
Inside each of the `li` elements, you will need to have an anchor element.

For the first anchor element, the text should be `About` and the `href` attribute value should be `"#about"`. The hash symbol in front of `about` represents an `id` name, which will be added later in the project.

For the second anchor element, the text should be `Posts` and the `href` attribute value should be `"#posts"`.

For the third anchor element, the text should be `Contact` and the `href` attribute value should be `"#contact"`.

---

### Step 6
Now that you are finished building out the page header, you will need to start adding your main content. 

Below your `header`, add a `main` element.

---

### Step 7
The first section on the page will be the about section. The section will introduce Mr. Whiskers and give users an idea of what this blog is about. 

Inside your `main` element, add a `section` element with the `id` attribute set to `"about"`. 

Inside the `section` element, add an `h2` with the text of `About`.

---

### Step 9
Now that you have added the about section, try clicking on the `About` link to see the page jump down to that section.

The next section in the blog page will be a list of posts talking about Mr. Whiskers.

Add another `section` element with an `id` set to `"posts"`.

Inside the `section` element, add an `h2` element with the text of `Posts`.

---

### Step 10
For the first blog post, you will use an <dfn>article</dfn> element.

The `article` element represents self contained content on a web page.

```html
<article>
  <h1>Example heading</h1>
  <p>Example article text</p>
</article>
```

Below the `h2` element, add an `article` element.

Inside the `article` element, add an `h3` element with the text `Mr. Whiskers' First Day Home`.

The reason an `h3` is used here is that maintaining a proper structural hierarchy for heading elements is important. Since the posts subheading is an `h2` element, the next level down in the hierarchy would be an `h3`.

---

### Step 11
This blog post is going to contain a couple of paragraphs with <dfn>lorem ipsum</dfn> text.

Lorem ipsum is commonly used in web development to serve as placeholder text. It is useful when you want to focus on building out the basic structure of your web pages and not have to worry about the actual content just yet. 

Here is an example of using lorem ipsum:

```html
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
  quod, voluptates, quae, quos quibusdam dolorum quia nemo repudiandae
  quidem voluptatum quas. Quisquam quod, voluptates, quae, quos
  quibusdam dolorum quia nemo repudiandae quidem voluptatum quas.
</p>
```

Below your `h3` element, add two paragraphs of lorem ipsum text.

---

### Step 12
For the second blog post, you will need to add another `article` element.

Inside the `article` element, add an `h3` element with the text of `Mr. Whiskers' First Bath`.

Below your `h3` element, add two paragraphs of lorem ipsum text.

---

### Step 13
For the third blog post, you will need to add another `article` element.

Inside the `article` element, add an `h3` element with the text of `Mr. Whiskers' First Birthday Party`.

Below your `h3` element, add two paragraphs of lorem ipsum text.

---

### Step 14
Now that you have finished adding all of the blog posts, try clicking on the `Posts` link and you should see that the page jumps down to the `Posts` section.

The last component to add to your blog page is going to be the contact section.

Below the `main` element, add a `footer` element.

---

### Step 15
Inside the `footer` element, add a `section` element with an `id` set to `contact`.

Inside the `section` element, add an `h2` element with the text of `Contact`.

---

### Step 16
Inside the contact section, you will want to show the blog author's contact information. You will use an <dfn>address</dfn> element for this.

The `address` element is used to represent contact information for a person or organization.

Here is an example using the `address` element for a physical address. The `br` element is used here to create a line break between the text.

```html
<address>
  1234 Make Believe Lane <br />
  Pretend City, USA
</address>
```

Below your `h2` element, add an `address` element.

---

### Step 17
For this step, you will need to add the phone number and email address for the blog author.

Inside the `address` element, add a paragraph element with the text of `Phone: 555-555-5555`.

Below that paragraph element, add another paragraph element with the text of `Email: fake@email.com`.

---

### Step 2
The `header` will be responsible for displaying main title, image and page navigation for the blog.

Inside the `header` element, add an `h1` with the text of `Welcome to Mr. Whiskers' Blog Page!`.

---

### Step 8
Below your `h2` element, add a paragraph element with the text of `Hi there! I'm Jane Doe, a passionate writer who finds endless inspiration in the antics of my beloved cat, Mr. Whiskers.`

Below your paragraph element, add another paragraph element with the text of `His playful nature and boundless energy keeps me on my toes. I love him so much.`

---

### Step 18
To improve user experience, you will want to enhance the phone number so that users tap on it and initiate a call.

Here is how you can make phone numbers clickable:

```html
<a href="tel:2345678912">234-567-8912</a>
```

Wrap the text `555-555-5555` in an anchor element and use `tel:` to make it a clickable phone number.

---

### Step 19
Similarly, users should be able to click on the email address and send an email from their default email client.

Here is how you can make email addresses clickable:

```html
<a href="mailto:contact@company.com">contact@company.com</a>
```

For this final step, wrap the text `fake@email.com` in an anchor element and use `mailto:` to make it a clickable email address.

And with those changes, your blog page is now complete.

---

### Build an Event Hub
In this lab you will utilize the semantic HTML elements to create the structure of a web page. You'll add content and images to make it look like a real event hub.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `header` element.
1. Inside the `header` element, you should have an `h1` element that contains the text `Event Hub`, and a `nav` element.
1. Inside the `nav` element, you should have an unordered list of two items containing links to different sections of the page. The first item should have the text `Upcoming Events`, and the second item should have the text `Past Events`.
1. Each link should be represented by an `a` element with an `href` attribute that links to the corresponding section of the page, `#upcoming-events` and `#past-events` respectively.
1. You should have a `main` element that contains the different sections of the page.
1. Inside the `main` element, you should have two `section` elements.
1. The first `section` element should have an `id` attribute with the value `upcoming-events`
1. Inside the `#upcoming-events` section, you should have:
   
   - An `h2` element with the text `Upcoming Events`.
   - Two `article` elements. Each article should represent an event, and it should have :
      - An `h3` element for the event title.
      - A `p` element for the event description. You can add a date at the bottom if you like.

1. The second `section` element should have an `id` attribute with the value `past-events`.
1. Inside the `#past-events` section, you should have:

   - An `h2` element with the text `Past Events`.
   - Two `article` elements. Each article element should represent a past event, and it should have:
     - An `h3` element for the event title, 
     - A `p` element for the event description. You can add a date at the bottom if you like.
     - An image element with the `src` attribute pointing to an image file and the `alt` attribute with a description of the image.

**Note:** You can use any text for the event descriptions and dates. You can use the following image URLs for the images if you like:

- `https://cdn.freecodecamp.org/curriculum/labs/past-event1.jpg`.
- `https://cdn.freecodecamp.org/curriculum/labs/past-event2.jpg`.

---

### Semantic HTML Review


---

### Semantic HTML Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What is presentational HTML?

#### --distractors--

Presentational HTML controls how data is stored on the server.

---

Presentational HTML determines the website's overall layout and navigation structure.

---

Presentational HTML is used for embedding multimedia content.

#### --answer--

Presentational HTML uses elements to control the appearance of content, rather than its meaning or structure.

### --question--

#### --text--

What is the role of the `pre` element?

#### --distractors--

It is used to represent a placeholder inside a web component.

---

It is used to display an indicator showing the completion progress of a task.

---

It is used to convey seriousness or strong importance.

#### --answer--

It is used to represent preformatted text.

### --question--

#### --text--

What is the role of the `h1` element?

#### --distractors--

It is used to group multiple heading elements on the page.

---

It serves as a container for the meta data in the HTML document.

---

It represents the root or top level element for the HTML document.

#### --answer--

It defines the main heading of a webpage, indicating its primary topic.

### --question--

#### --text--

What is the role of the `address` element?

#### --distractors--

It specifies the font size for the main content.

---

It creates a navigation menu for the website.

---

It formats text as superscript.

#### --answer--

It is used to represent contact information for a section on a web page.

### --question--

#### --text--

Which of the following elements holds no semantic meaning?

#### --distractors--

`article`

---

`main`

---

`footer`

#### --answer--

`div`

### --question--

#### --text--

Which of the following elements is used to represent a specific moment in time?

#### --distractors--

`output`

---

`ins`

---

`div`

#### --answer--

`time`

### --question--

#### --text--

What is a typical use case of the `ruby` element?

#### --distractors--

It specifies the document's character encoding.

---

It inserts a table for displaying tabular data.

---

It embeds a video or audio player in the document.

#### --answer--

It is used to show the pronunciation of East Asian characters.

### --question--

#### --text--

Which element is used to highlight keywords in summaries or product names in reviews?

#### --distractors--

`ruby`

---

`table`

---

`template`

#### --answer--

`b`

### --question--

#### --text--

What is the role of the `u` element?

#### --distractors--

It styles text with custom fonts.

---

It specifies the document's character encoding.

---

It creates a dropdown menu for selecting options.

#### --answer--

It is used to represent inline text that has non-textual annotation applied.

### --question--

#### --text--

Which of the following elements is used to represent an extended quotation?

#### --distractors--

`textarea`

---

`sup`

---

`article`

#### --answer--

`blockquote`

### --question--

#### --text--

Which of the following elements is used to provide a description, or definition for the term inside a description list?

#### --distractors--

`dt`

---

`dl`

---

`div`

#### --answer--

`dd`

### --question--

#### --text--

Which of the following elements is typically used with the `code` element?

#### --distractors--

`ins`

---

`summary`

---

`div`

#### --answer--

`pre`

### --question--

#### --text--

Which of the following attributes is used to translate dates and times into a machine-readable format?

#### --distractors--

`alt`

---

`rel`

---

`accept`

#### --answer--

`datetime`

### --question--

#### --text--

Why is it important to not skip heading levels?

#### --distractors--

Skipping heading levels improves website design aesthetics.

---

Skipping heading levels makes text appear in different colors.

---

Skipping heading levels enhances page loading speed.

#### --answer--

Skipping heading levels can confuse screen readers and hinder content accessibility by disrupting the logical content hierarchy.

### --question--

#### --text--

Which of the following is a deprecated presentational HTML element?

#### --distractors--

`div`

---

`footer`

---

`article`

#### --answer--

`font`

### --question--

#### --text--

Which of the following elements is used to represent navigation links?

#### --distractors--

`figure`

---

`div`

---

`section`

#### --answer--

`nav`

### --question--

#### --text--

Which of the following elements represents a description term inside a description list?

#### --distractors--

`dd`

---

`dfn`

---

`del`

#### --answer--

`dt`

### --question--

#### --text--

What is the role of the `i` element?

#### --distractors--

It is used to represent text that has been marked for reference purposes.

---

It is used to provide a caption or legend for disclosure boxes.

---

It is used to format numerical data and sort it from smallest to largest.

#### --answer--

It is used to represent idiomatic text, technical terms, and taxonomical designations.

### --question--

#### --text--

Which of the following elements is used to emphasize text?

#### --distractors--

`anchor`

---

`div`

---

`optgroup`

#### --answer--

`em`

### --question--

#### --text--

Which of the following attributes is used to specify the source or reference of the quoted content for a blockquote?

#### --distractors--

`alt`

---

`class`

---

`lang`

#### --answer--

`cite`

## --quiz--

### --question--

#### --text--

Which of the following is NOT an example of a presentational HTML element?

#### --distractors--

`font`

---

`center`

---

`big`

#### --answer--

`article`

### --question--

#### --text--

Which of the following elements is used to represent a single line of code in HTML?

#### --distractors--

`codes`

---

`codecs`

---

`coding`

#### --answer--

`code`

### --question--

#### --text--

What is the difference between the `strong` and `b` elements?

#### --distractors--

The `b` element is used to emphasize the importance of the text while the `strong` is used to highlight alternative voice or mood.

---

The `strong` element is used to highlight alternative voice or mood while the `b` element emphasizes text that is crucial, or urgent.

---

The `strong` element is commonly used to highlight keywords in summaries while the `b` element emphasizes text that is crucial, or urgent.

#### --answer--

The `b` element is commonly used to highlight keywords in summaries while the `strong` element emphasizes text that is crucial, or urgent.

### --question--

#### --text--

Which of the following is the correct way to use to emphasize a piece of text?

#### --distractors--

```html
<p>
  Never give up on <emphasis>your</emphasis> dreams.
</p>
```

---

```html
<p>
  Never give up on <emphasize>your</emphasize> dreams.
</p>
```

---

```html
<p>
  Never give up on <e>your</e> dreams.
</p>
```

#### --answer--

```html
<p>
  Never give up on <em>your</em> dreams.
</p>
```

### --question--

#### --text--

Which of the following elements is used to bring attention to text that is not important for the meaning of the content?

#### --distractors--

`em`

---

`small`

---

`strong`

#### --answer--

`b`

### --question--

#### --text--

When should you use CSS instead of the `i` or `em` elements?

#### --distractors--

When the text has a special purpose or meaning in the paragraph.

---

When the text is an idiomatic expression.

---

When the text needs to be emphasized for importance.

#### --answer--

When you want to display text in italics for presentational purposes only.

### --question--

#### --text--

Which of the following elements is used to represent a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation?

#### --distractors--

`sub`

---

`span`

---

`s`

#### --answer--

`u`

### --question--

#### --text--

Which of the following is the correct way to represent a section quoted from another source?

#### --distractors--

```html
<cite cite="https://www.freecodecamp.org/news/learn-to-code-book/">
  "Can you imagine what it would be like to be a successful developer? To have built software systems that people rely upon?"
</cite>
```

---

```html
<block cite="https://www.freecodecamp.org/news/learn-to-code-book/">
  "Can you imagine what it would be like to be a successful developer? To have built software systems that people rely upon?"
</block>
```

---

```html
<quotes cite="https://www.freecodecamp.org/news/learn-to-code-book/">
  "Can you imagine what it would be like to be a successful developer? To have built software systems that people rely upon?"
</quotes>
```

#### --answer--

```html
<blockquote cite="https://www.freecodecamp.org/news/learn-to-code-book/">
  "Can you imagine what it would be like to be a successful developer? To have built software systems that people rely upon?"
</blockquote>
```

### --question--

#### --text--

Which of the following elements is used to mark up the title of a referenced creative work like a book?

#### --distractors--

`figure`

---

`article`

---

`div`

#### --answer--

`cite`

### --question--

#### --text--

What is the role of the `q` element?

#### --distractors--

It represents a fragment of computer code.

---

It represents superscript text.

---

It represents a date and/or time.

#### --answer--

It represents a short inline quotation.

### --question--

#### --text--

Which of the following is used to display abbreviations and acronyms in HTML?

#### --distractors--

```html
<p><acronym>HTML</acronym> is the foundation of the web.</p>
```

---

```html
<p><acr>HTML</acr> is the foundation of the web.</p>
```

---

```html
<p><abbreviation>HTML</abbreviation> is the foundation of the web.</p>
```

#### --answer--

```html
<p><abbr>HTML</abbr> is the foundation of the web.</p>
```

### --question--

#### --text--

What is the role of the `title` attribute inside of the abbreviation element?

#### --distractors--

It is used to represent subscript text.

---

It is used to represent a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation.

---

It is used to annotate text with pronunciation or meaning explanations.

#### --answer--

It is used to help users understand what this acronym means.

### --question--

#### --text--

Which of the following elements is used to represent contact information on the web page?

#### --distractors--

`location`

---

`residence`

---

`contact`

#### --answer--

`address`

### --question--

#### --text--

What is the role of the `datetime` attribute in the `time` element?

#### --distractors--

It is used to display an alert to show the current date and time.

---

It is used to set the time to a 12-hour clock format.

---

It is used to set the time to military format.

#### --answer--

It is used to represent dates and times in a machine-readable format. 

### --question--

#### --text--

Which of the following is used to display a piece of text as a superscript?

#### --distractors--

```html
<p>2<superscript>2</superscript> (2 squared) is 4.</p>
```

---

```html
<p>2<s>2</s> (2 squared) is 4.</p>
```

---

```html
<p>2<super>2</super> (2 squared) is 4.</p>
```

#### --answer--

```html
<p>2<sup>2</sup> (2 squared) is 4.</p>
```

### --question--

#### --text--

Which of the following is NOT a common use case for using the subscript (`sub`) element?

#### --distractors--

variable subscripts

---

footnotes

---

chemical formulas

#### --answer--

displaying dates

### --question--

#### --text--

What is the role of the `s` element?

#### --distractors--

It is used to style a piece of text with a raised baseline.

---

It is used to indicate text for the ruby annotation.

---

It is used to represent inline text that has non-textual annotation applied.

#### --answer--

It is used to represent when text is no longer accurate or relevant.

### --question--

#### --text--

Which of the following is NOT a common use case for using the superscript element?

#### --distractors--

exponents

---

superior lettering

---

ordinal numbers

#### --answer--

chemical formulas

### --question--

#### --text--

What is the role of the `ruby` element?

#### --distractors--

It represents a list of term-description groupings.

---

It represents the term being defined in a description list.

---

It represents preformatted text for code examples.

#### --answer--

It represents small text shown above or below the main text.

### --question--

#### --text--

Which of the following elements is used as a fallback for browsers lacking support for displaying ruby annotations?

#### --distractors--

`rub`

---

`pr`

---

`r`

#### --answer--

`rp`

## --quiz--

### --question--

#### --text--

What is the purpose of the `header` element in HTML?

#### --distractors--

It defines the main content of the document.

---

It represents a section with navigation links.

---

It defines a sidebar for the document.

#### --answer--

It marks the header of a document or section.

### --question--

#### --text--

Which element is used to contain the main content of a web page?

#### --distractors--

`nav`

---

`article`

---

`section`

#### --answer--

`main`

### --question--

#### --text--

What is the correct use of the `nav` element?

#### --distractors--

To define the header of a document.

---

To display metadata about a webpage.

---

To contain the main content of the page.

#### --answer--

To represent a section with navigation links.

### --question--

#### --text--

Which element is used to mark text with stress emphasis?

#### --distractors--

`mark`

---

`i`

---

`b`

#### --answer--

`em`

### --question--

#### --text--

What is the purpose of the `figure` element?

#### --distractors--

To define the main content of the page.

---

To group multiple articles together.

---

To represent a section with navigation links.

#### --answer--

To contain illustrations and diagrams.

### --question--

#### --text--

Which element is used to represent a short inline quotation?

#### --distractors--

`blockquote`

---

`span`

---

`cite`

#### --answer--

`q`

### --question--

#### --text--

What is the purpose of the `time` element?

#### --distractors--

To define a script execution time.

---

To define the main content of the page.

---

To highlight important text.

#### --answer--

To represent a date or time value.

### --question--

#### --text--

Which element is used to represent an abbreviation or acronym?

#### --distractors--

`var`

---

`cite`

---

`code`

#### --answer--

`abbr`

### --question--

#### --text--

What is the purpose of the `blockquote` element?

#### --distractors--

To represent a short inline quotation.

---

To define a paragraph with larger text.

---

To define the main content of the page.

#### --answer--

To represent a section quoted from another source.

### --question--

#### --text--

Which element is used to represent a list of term-description groupings?

#### --distractors--

`ul`

---

`table`

---

`ol`

#### --answer--

`dl`

### --question--

#### --text--

What is the purpose of the `cite` element?

#### --distractors--

To represent a short inline quotation.

---

To represent a highlighted word.

---

To define the main content of the page.

#### --answer--

To attribute the source of a referenced work.

### --question--

#### --text--

Which element is used to represent superscript text?

#### --distractors--

`sub`

---

`abbr`

---

`strong`

#### --answer--

`sup`

### --question--

#### --text--

What is the purpose of the `address` element?

#### --distractors--

To define the main content of the page.

---

To define the address of a hyperlink.

---

To represent a section with navigation links.

#### --answer--

To represent contact information for the author or owner of a webpage.

### --question--

#### --text--

Which element is used to represent preformatted text?

#### --distractors--

`code`

---

`samp`

---

`blockquote`

#### --answer--

`pre`

### --question--

#### --text--

What is the purpose of the `strong` element?

#### --distractors--

To mark text with stress emphasis.

---

To make text italic.

---

To highlight text that is not important.

#### --answer--

To mark text with strong importance.

### --question--

#### --text--

Which element is used to represent a fragment of computer code?

#### --distractors--

`pre`

---

`var`

---

`blockquote`

#### --answer--

`code`

### --question--

#### --text--

What is the purpose of the `abbr` element?

#### --distractors--

To represent a date or time value.

---

To add tooltips to text.

---

To represent a short inline quotation.

#### --answer--

To represent an abbreviation or acronym.

### --question--

#### --text--

Which element is used to represent a long quotation from another source?

#### --distractors--

`q`

---

`mark`

---

`cite`

#### --answer--

`blockquote`

### --question--

#### --text--

What is the purpose of the `dl` element?

#### --distractors--

To represent a list of items.

---

To define a list of numbered items.

---

To represent a section with navigation links.

#### --answer--

To represent a list of term-description groupings.

### --question--

#### --text--

Which element is used to represent subscript text?

#### --distractors--

`sup`

---

`small`

---

`strong`

#### --answer--

`sub`

---

## html-forms-and-tables

### How Do Forms, Labels, and Inputs Work in HTML?


---

### What Are the Different Types of Buttons, and When Should You Use Them?


---

### What Is Client-Side Form Validation in HTML Forms, and What Are Some Examples?


---

### What Are the Different Form States, and Why Are They Important?


---

### Step 1
In this workshop, you will practice working with HTML forms by building a Hotel Feedback Form.

For the introductory text, you will want to display the main title followed by a short note about leaving feedback. 

Inside your `body` element, add a `header` element.

Inside the `header` element, add an `h1` element. The `h1` element's text should be `Hotel Feedback Form`.

Below your `h1` element, add a `p` element. The `p` element's text should be `Thank you for staying with us. Please provide feedback on your recent stay.`

---

### Step 2
Now, it is time to add the `main` element which represents the main content of the page.

---

### Step 3
In previous lessons, you learned how to work with the `form` element like this:

```html
<form method="value-goes-here" action="url-goes-here">
  <!-- inputs go inside here -->
</form>
```

The `action` attribute is used to specify where the form data should be sent when the form is submitted.

The `method` attribute is used to specify the HTTP method to use when sending the form data. The most common methods are `GET` and `POST`. 

**NOTE**: You will learn about how HTTP methods work in later modules.

Inside your `main` element, add a `form` element with an `action` attribute set to `"https://hotel-feedback.freecodecamp.org"` and a `method` attribute set to `"POST"`.

---

### Step 4
Forms consist of `inputs` where users can input their data. You can group related inputs together using the `fieldset` element. 

Here is an example of using a `fieldset` element:

```html
<form action="/example-url">
  <fieldset>
  <!-- inputs go inside here-->
  </fieldset>
</form>
```

Inside your `form` element, add a `fieldset` element.

---

### Step 5
When working with `fieldset` elements, it is common to use a caption to describe the group of inputs. You can use the `legend` element for this.

Here is an example of using a `legend` element:

```html
<form action="/example-url">
  <fieldset>
    <legend>Personal Information</legend>
    <!-- inputs go inside here-->
  </fieldset>
</form>
```

Inside your `fieldset` element, add a `legend` element with the text `Personal Information`.

---

### Step 6
In previous lessons, you learned how to associate a `label` element with an `input` like this:

```html
<label for="name">Name:</label>
<input type="text" id="name" name="name">
```

The `for` attribute on the `label` element should match the `id` attribute on the `input` element. This is known as an explicit association.

Below your `legend` element, add a `label` element with the text of `Name (required):`. Set its `for` attribute to the value of `"full-name"`.

Then below your `label` element, add an `input` element with no attributes. In the next steps, you will add the necessary attributes.

---

### Step 7
When a user provides their full name, the `input` will accept plaintext.

In previous lessons, you learned how to work with the `type` attribute like this:

```html
<input type="text">
```

For your existing `input` element, add a `type` attribute set to `"text"`. 

Also give the `input` element an `id` attribute with the value of `"full-name"`.

---

### Step 8
The `name` attribute is used to identify form data after it has been submitted to the server.

Here is an example of how to use the `name` attribute:

```html
<input type="email" name="email">
```

Add a `name` attribute to the `input` element with the value of `"name"`.

---

### Step 9
In previous lessons, you learned how to work with the `placeholder` and `required` attributes like this:

```html
<input type="text" placeholder="e.g., John Doe" required>
```

For your existing `input` element, add a `placeholder` attribute with the value of `"e.g., John Doe"`.

Also, add the `required` attribute to the `input` element.

---

### Step 10
Your hotel feedback form should also collect an email address from the user. 

Start by adding a new `label` element with the text `Email address (required):` to the form. Your `label` element should have a `for` attribute set to the value of `"email"`.

---

### Step 11
Next, add an `input` with the type of `"email"` below your email `label`. This `input` should have an `id` attribute set to the value of `"email"`. Also, set the `name` attribute to the value of `"email"`. 

This `input` is also required, so make sure to add the `required` attribute.

Finally, add a `placeholder` attribute set to `"example@email.com"`.

---

### Step 13
Your hotel feedback form should have an option for users to add their age. 

Start by adding a `label` element with the text `Age (optional):` to the form.

The `for` attribute should be set to `"age"`.

---

### Step 14
The number `input` is used to create a numeric input field. 

Here is an example of a number input field:

```html
<input type="number" id="age" name="age" min="18" max="100">
```

The `min` and `max` attributes are used to set the minimum and maximum values that can be entered in the input field.

Below your `label` element, add an input with the `type` attribute set to `"number"` and an `id` of `"age"`.

The `name` attribute should be set to `"age"`, the `min` attribute should be set to `"3"` and the `max` attribute should be set to `"100"`.

---

### Step 15
The next section in the form will be responsible for asking users if they have stayed at the hotel before. 

Start by adding a `fieldset` element.

Inside the `fieldset` element, add a `legend` element with the text of `Was this your first time at our hotel?`.

---

### Step 16
If you want users to select one option from a list of options, you can use a set of radio buttons.

Here is an example of two radio buttons:

```html
<input type="radio" id="yes" name="first-time">
<label for="yes">Yes</label>
<input type="radio" id="no" name="first-time">
<label for="no">No</label>
```

In this example, the radio buttons are grouped together by using the same `name` attribute value. This means that only one radio button can be selected at a time.

Below your `legend` element, add a `radio` button with the `id` set to `"yes-option"`, the `name` attribute set to `"hotel-stay"`, and a `value` attribute set to `"yes"`.

Below your `radio` button, add a `label` element with the text `Yes` and a `for` attribute set to `"yes-option"`.

---

### Step 17
Below your `label` element, add a `radio` button with the `id` set to `"no-option"`, the `name` attribute set to `"hotel-stay"`, and a `value` attribute set to `"no"`. 

Below your new `radio` button, add another `label` element with the `for` attribute set to `"no-option"`. The text for the `label` should be `No`.

When you are finished, you can now try out the radio buttons by selecting one option at a time.

---

### Step 18
The next section of the form will ask users why they chose that particular hotel. Users will have the opportunity to select multiple options.

Start by adding another `fieldset` element.

Inside the `fieldset` element, add a `legend` element with the text `Why did you choose to stay at our hotel? (Check all that apply)`.

---

### Step 19
When you want a user to select multiple options from a list, you can use checkboxes. 

Here is an example of how to work with checkboxes dealing with food options:

```html
<fieldset>
  <legend>Food Options</legend>
  <input type="checkbox" id="pizza" name="food" value="pizza">
  <label for="pizza">Pizza</label>
  <input type="checkbox" id="burger" name="food" value="burger">
  <label for="burger">Burger</label>
</fieldset>
```

The `value` attribute is used to specify the value that will be sent to the server when the form is submitted.

Below your `legend` element, add a checkbox `input` with the `id` and `value` attributes set to `"ads"`, and the `name` attribute set to `"choice"`.

Below your checkbox `input`, add a `label` element with the text `Social Media Ads`. The `for` attribute should be set to `"ads"`.

---

### Step 20
Add another checkbox `input` with the `id`and `value` attributes set to `"recommendation"`, and a `name` attribute set to `"choice"`.

Below the checkbox `input`, add another `label` with the text `Personal Recommendation`. The `for` attribute should be set to `"recommendation"`.

---

### Step 21
Next, add another checkbox `input` with the `id` and `value` attributes set to `"location"`, and the `name` attribute set to `"choice"`.

For the `label` element, the text of `Location` and the `for` attribute should be set to `"location"`.

Below that `label` element, add another checkbox `input` with the `id` and `value` attributes set to `"reputation"`, and the `name` attribute set to `"choice"`.

For the `label` element, the text of `Reputation` and the `for` attribute should be set to `"reputation"`.

---

### Step 23
For the final `input` and `label` inside this `fieldset`, you will add a checkbox `input` with the `id` and `value` attributes set to `"price"`, and a `name` attribute set to `"choice"`.

Then, a `label` element with the text `Price` and the `for` attribute set to `"price"`.

Now you can test out your `form` by selecting the various checkboxes.

---

### Step 24
The next section of the form will provide users with the ability to leave a rating for the hotel. 

Start by adding a new `fieldset` element with a `legend` element nested inside. The `legend` should have the text `Ratings`.

Below the `legend` element, add a `label` element with the text `How was the service?`. The `for` attribute should be set to `"service"`.

---

### Step 25
When you want users to make selections from a dropdown menu, you can use the `select` and `option` elements. 

Here is an example of using the `select` and `option` elements to create a dropdown for different cities:

```html
<label for="city">Choose a City: </label>
<select id="city" name="city">
  <option value="new-york">New York</option>
  <option value="los-angeles">Los Angeles</option>
  <option value="chicago">Chicago</option>
  <option value="miami">Miami</option>
</select>
```

Start by adding a `select` element with the `name` and `id` attributes set to `"service"`.

---

### Step 26
Inside your `select` element, add the following five `option` elements with these corresponding values for the `option` text and `value` attribute:

**Value Attributes:**

- poor
- satisfactory
- good
- very-good
- excellent

**Option Element Text:**

- Poor
- Satisfactory
- Good
- Very Good
- Excellent

---

### Step 27
To make an `option` selected by default, you can add the `selected` attribute to the `option` element you want to be selected.

Here is an example using the `selected` attribute:

```html
<option selected value="amazing">Amazing</option>
```

Inside your `select` element, add the `selected` attribute to the `option` element with the value of `"excellent"`.

---

### Step 28
Your hotel feedback form should also give users the ability to rate the food.

Start by adding a `label` element with the text of `How was the food?`. That `label` element should have a `for` attribute set to `"food"`.

Below your `label` element, add a `select` element with an `id` and `name` set to `"food"`.

---

### Step 29
Inside your `select` element, add the following five `option` elements with these corresponding values for the `option` text and `value` attribute:

**Value Attribute:**

- poor
- satisfactory
- good
- very-good
- excellent

**Option Text:**

- Poor
- Satisfactory
- Good
- Very Good
- Excellent

Don't forget to add the `selected` attribute to the `option` element with the value of `"excellent"`.

---

### Step 30
The last section of the `form` will allow users to provide any additional feedback they like about the hotel.

Start by adding a `label` element with the text of `Other Comments?` and a `for` attribute set to `"comments"`.

---

### Step 31
If you want users to have more space to write their comments, you can use a `textarea` element. 

The `textarea` element is a multi-line text input control that allows users to enter text that is longer than a single line. It can be used to create a comment box, a message input, or other text input that requires multiple lines.

Here's an example of a `textarea` element:

```html
<textarea id="comments" name="comments" rows="4" cols="50"></textarea>
```

The `rows` attribute is used to specify the visible height of the `textarea`, and the `cols` attribute is used to specify the visible width of the `textarea`.

Below your `label` element, add a `textarea` element. In the next step, you will add the necessary attributes.

---

### Step 32
For your `textarea` element, add an `id` and `name` attribute with the value of `"comments"`. 

For the `cols` attribute set the value to `30` and for the `rows` attribute set the value to `10`.

---

### Step 33
For the last step in the hotel feedback form workshop, you will need to add a submit button to the form.

Remember that you learned how to work submit buttons in previous lessons.

Add a `button` element with the `type` attribute set to `"submit"` and the text content set to `Submit`.

And with that, your hotel feedback form is complete!

---

### Step 22
To make a checkbox input checked by default, you can add the `checked` attribute.

Here is an example of using the `checked` attribute:

```html
<input checked type="checkbox" id="checked" name="checked">
```

Add the `checked` attribute to the checkbox input with the `id` of `"reputation"` to make it checked by default.

---

### Step 12
`input` elements can have a `size` attribute. This attribute defines the number of characters that should be visible as the user types into the input. The value of `size` should be a non-negative integer greater than zero. If `size` is not specified, or is specified with an invalid value, the input will have the default width set by the browser.

```html
<label for="lastName">Last Name:</label>
<input id="lastName" name="lastName" type="text" size="10" />
```

Give the name and email inputs a `size` attribute with a value of `"20"`.

---

### What Are HTML Tables Used For, and What Should They Not Be Used For?


---

### Step 1
In this workshop, you will practice working with HTML tables by building a final exam table for a group of students. 

In previous lessons, you learned how to work with the `table` element to represent tabular data.

Inside your `body` element, nest a `table` element.

---

### Step 2
To add a caption to a `table`, you can use the <dfn>table caption</dfn> element.

Here is an example using the `caption` element:

```html
<table>
  <caption>Football Scores</caption>
</table>
```

Inside your `table` element, nest a `caption` element with the text `Calculus Final Exam Grades`.

---

### Step 3
For the first section of the table, you will want to group the header content which represents the column labels for the student's first name, last name, and final exam grade.

The <dfn>table head</dfn> element, `thead`, is used to group the header content in a table. 

Here is an example using the `thead` element:

```html
<table>
  <thead>
    <!-- header content goes here -->
  </thead>
</table>
```

Below your `caption` element, add a table head element.

---

### Step 4
The table head element consists of a <dfn>table row</dfn> element, `tr`, which contains the <dfn>table header cell</dfn> elements, `th`.

Here is an example using the `tr` and `th` elements for a sports table:

```html
<table>
  <caption>Football Scores</caption>
  <thead>
    <tr>
      <th>Team</th>
      <th>Wins</th>
      <th>Losses</th>
    </tr>
  </thead>
</table>
```

Inside your `thead` element, add a `tr` element.

Inside your `tr` element, add three `th` elements. 

The first `th` element should contain the text `Last Name`. The second `th` element should contain the text `First Name`. The third `th` element should contain the text `Grade`.

---

### Step 5
Now that you have completed the head section, it is time to add the <dfn>table body</dfn>, `tbody`. The table body will represent all of the student names and their grades.

Add a table body element to your table.

---

### Step 6
To add student data to the table, you will need to use the table row and table data elements.

The <dfn>table data</dfn> element, `td`, is used to create a cell in the table.

Here is an example of using the `td` element for a sports players table:

```html
<tr>
  <td>1</td>
  <td>John Doe</td>
  <td>USA</td>
</tr>
```

Inside your table body element, add a table row element, `tr`, with three table data elements, `td`. 

The first table data element should contain the last name of `Davis`. 

The second table data element should contain the first name of `Alex`. 

The third table data element should contain the grade of `54`.

---

### Step 7
Now it is time to add two more students to the table.

Following the same pattern as the previous step, add a second student table row. Use the following data for the table data elements:

- Last Name: `Doe`
- First Name: `Samantha`
- Grade: `92`

For the third student table row, use the following data for the table data elements:

- Last Name: `Rodriguez`
- First Name: `Marcus`
- Grade: `88`

---

### Step 8
Now it is time to add two more students to the table.

Following the same pattern as the previous steps, add a fourth student table row. Use the following data for the table data elements:

- Last Name: `Thompson`
- First Name: `Jane`
- Grade: `77`

For the fifth student table row, use the following data for the table data elements:

- Last Name: `Williams`
- First Name: `Natalie`
- Grade: `83`

---

### Step 9
The last section to add to the table would be the <dfn>table foot</dfn> element, `tfoot`. The table foot element will be used to display the average grade for all of the students in the table.

Add a `tfoot` element to the table. 

Inside the `tfoot` element, add a `tr` element.

Inside the `tr` element, add two `td` elements. 

The first `td` element should contain the text `Average Grade`. The second `td` element should contain the text `78.8`.

---

### Step 10
Your table is almost complete but there is one last thing to add.

It would be nice if the `td` element used for the `Average Grade` would span across two columns instead of just one.

To do this, you can use the <dfn>colspan</dfn> attribute on the `td` element. 

The `colspan` attribute specifies the number of columns a cell should span.

Here is an example of using the `colspan` attribute for a sports table:

```html
<tr>
  <td colspan="3">Total Points</td>
</tr>
```

Inside the opening `td` tag, add the `colspan` attribute and set it to `"2"`.

And with that change, your table is complete!

---

### Build a Book Catalog Table
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should create a `table` element that lists book information.
1. Your table should have a table head element with one row in it.
1. The row in your table head element should have four table header elements, with the text of `Title`, `Author`, `Genre`, and `Publication Year`, in that order.
1. Your table should have a table body element with at least five rows in it.
1. Each row in your table body should have four table data elements that display the book's Title, Author, Genre, and Publication Year.
1. Your table should have a table footer element with one row in it.
1. The row in your table footer element should have a table data element that spans four columns and has the text `Total Books: N` where `N` should be replaced by the number of books in your table.

---

### What Is an HTML Validator, and How Can It Help You Debug Your Code?
HTML is a very forgiving language – elements still render even when you make mistakes, like forgetting to include a closing tag.

Let's say you have an `h2` element without a closing tag:

```html
<h1>Article Topic</h1>
<h2>Subheading 1 </h2>
<h2>Subheading 2 </h2>

<!-- This h2 does not have a closing tag -->
<h2>Subheading 3
```

The `h2` without a closing tag will still render fine. This happens because browsers use a parsing algorithm that handles common errors and tries to render HTML as closely as possible to the author's intention.

But this could backfire sometimes. Let's add a few paragraphs under the existing heading 2 tags in the code:

```html
<h1>Article Topic</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, nisi.</p>

<h2>Subheading 1 </h2>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, doloremque.</p>

<h2>Subheading 2 </h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, placeat.</p>

<!-- This h2 does not have a closing tag -->
<h2>Subheading 3
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, illum.</p>
```

As a result, the paragraph element under the `h2` without a closing `h2` tag renders as heading 2. This is why you need an HTML validator.

An HTML validator is a tool that checks the validity of your HTML code against the standard HTML specifications. It helps you identify errors and warnings in your HTML code, ensuring your web pages are correctly structured and compliant with web standards.

Using an HTML validator benefits not only you and your future code reviews, but also anybody else going through your code, such as your teammates and open-source contributors.

There are several HTML validators out there you can use. The most widely accepted one is the `w3.org` markup validation service.

When you visit the site [`validator.w3.org`](https://validator.w3.org/), you can click on the `Validate by Direct Input` button and paste in your HTML code.

When you click on the `Check` button, then a list of results will display with the errors that need to be fixed.

Another HTML validator that you can use is [`jsonformatter.org`](https://jsonformatter.org/).

You can copy and paste your HTML code inside the first editor, and when you click on the `Validate` button, it will show you any errors you have in your code.

# --questions--

## --text--

Why does the browser render tags correctly even when there's an error like forgetting to close a tag?

## --answers--

HTML does not care about closing a tag.

### --feedback--

Look out for the algorithm one of the tools use for figuring out what the author intends to do.

---

The browser's parsing algorithm figures out the errors and tries to render the tags as intended.

---

The code editor's diffing algorithm knows what the author wants to render.

### --feedback--

Look out for the algorithm one of the tools use for figuring out what the author intends to do.

---

HTML is smart enough to know what the author wants to show.

### --feedback--

Look out for the algorithm one of the tools use for figuring out what the author intends to do.

## --video-solution--

2

## --text--

What is an HTML validator?

## --answers--

A tool for writing HTML.

### --feedback--

Look out for the tool that figures out what is wrong with an HTML code.

---

A tool for arranging HTML code.

### --feedback--

Look out for the tool that figures out what is wrong with an HTML code.

---

A tool for making HTML code work across browsers.

### --feedback--

Look out for the tool that figures out what is wrong with an HTML code.

---

A tool that checks the validity of HTML.

## --video-solution--

4

## --text--

Which of these is an example of an HTML validator?

## --answers--

W3.org HTML validator

---

CSS Lint

### --feedback--

Look for the tool specifically designed to check the validity of HTML code.

---

JavaScript Debugger

### --feedback--

Look for the tool specifically designed to check the validity of HTML code.

---

Photoshop

### --feedback--

Look for the tool specifically designed to check the validity of HTML code.

## --video-solution--

1

---

### How to Use the DOM Inspector and DevTools to Debug and Build Your Projects
When you are building out your projects, you will frequently run into issues where your programs are not working as expected.

Programmers often refer to issues as bugs. The process of finding and fixing these bugs is known as debugging.

To debug your code, you will need to use some tools provided by your browser.

Two important tools to use would be the DOM inspector and developer tools.

The DOM inspector allows you to inspect the HTML structure of the page you are on.

The DOM stands for Document Object Model. It is a tree-like structure that represents the elements on a page. You will learn more about the DOM in later modules.

The developer tools allow you to inspect the HTML, CSS, and JavaScript of the page you are on.

Let's take a look at an HTML example that contains a small bug in the anchor element:

```html
<a href="https://www.freecodecamp.org/larn/">freeCodeCamp curriculum</a>
```

When you click on the link, it will lead to a 404 page. A 404 page is an error page that appears when a user tries to access a webpage that doesn't exist on the server.

The intent is for the link to lead to the freeCodeCamp curriculum.

To see what the issue might be, you can use the developer tools.

To open the developer tools in your browser, you can right-click on the page and select `Inspect`.

You can also use `Control Shift I` on your PC keyboard or `Command Option I` on your Mac.

When you open developer tools in Google Chrome, you'll see a number of tabs. The first tab is called the `Elements` tab. This tab shows you the HTML structure of the page you are on.

The second tab is called the `Console` tab. This tab shows you any errors that might be occurring on the page.

In the situation where you have a broken link, you can check the console to see the error messages for that broken link. The common message that continues to display for the broken link is the 404 error. The 404 error indicates that the page is not found.

This lets us know that the issue is with the URL in the anchor element. When you inspect the `href` value you will see there is a typo.

Right now the console message shows `/larn` against a 404, but the correct URL should be `/learn`. When the link is corrected, then it will work as expected.

You will learn more about working with the developer tools throughout the certification, but this is just a short example on how it can help you debug your code.

# --questions--

## --text--

What is the process of finding and fixing bugs in your code called?

## --answers--

Scanning

### --feedback--

Review the beginning of the lesson where this was discussed.

---

Building

### --feedback--

Review the beginning of the lesson where this was discussed.

---

Debugging

---

Scripting

### --feedback--

Review the beginning of the lesson where this was discussed.

## --video-solution--

3

## --text--

What is the tree-like structure that represents the elements on a page called?

## --answers--

BOM

### --feedback--

Review the beginning of the lesson where this was discussed.

---

DOM

---

Python

### --feedback--

Review the beginning of the lesson where this was discussed.

---

CSS

### --feedback--

Review the beginning of the lesson where this was discussed.

## --video-solution--

2

## --text--

What is the role of the "elements" tab in the developer tools?

## --answers--

It shows you the HTML structure of the page you are on.

---

It shows you the CSS structure of the page you are on.

### --feedback--

The name of this tab implies what it is used for.

---

It shows you the JavaScript structure of the page you are on.

### --feedback--

The name of this tab implies what it is used for.

---

It shows you the PHP structure of the page you are on.

### --feedback--

The name of this tab implies what it is used for.

## --video-solution--

1

---

### HTML Tables and Forms Review


---

### HTML Tables and Forms Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

Which of the following attributes is used to specify the URL where the form data should be sent?

#### --distractors--

`capture`

---

`accept`

---

`lang`

#### --answer--

`action`

### --question--

#### --text--

Which two elements are used to specify a row and a row header in a table?

#### --distractors--

The `r` element is used for rows and the `thead` element is used for the header.

---

The `row` element is used for rows and the `th` element is used for the header.

---

The `tr` element is used for rows and the `head` element is used for the header.

#### --answer--

The `tr` element is used for rows and the `th` element is used for the header.

### --question--

#### --text--

What is the `td` element used for?

#### --distractors--

It is used to define a table data type.

---

It is used to merge two columns.

---

It is used to merge two rows.

#### --answer--

It is used to define a table cell.

### --question--

#### --text--

What is the function of the `colspan` attribute?

#### --distractors--

It defines the length of a column in a table.

---

It removes the breakline between text in a column.

---

It's used to define the number of columns.

#### --answer--

It defines the number of columns a table cell should span.

### --question--

#### --text--

What is the role of the `placeholder` attribute?

#### --distractors--

It's used to send data to the server when the form is submitted.

---

It's used to associate a `label` element with an `input` element.

---

It's used to specify that an input field is read-only to the user.

#### --answer--

It's used to provide a hint for an input field.

### --question--

#### --text--

What is the purpose of the `thead` element?

#### --distractors--

It's used to group the body content in an HTML table.

---

It's used to group the description of an HTML table.

---

It's used to group the footer content in an HTML table.

#### --answer--

It's used to group the header content in an HTML table.

### --question--

#### --text--

Which of the following is an example of explicit form association between labels and inputs?

#### --distractors--

```html
<label connect="age">Age:</label>

<input type="number" id="age" name="age">
```

---

```html
<label associate="age">Age:</label>

<input type="number" id="age" name="age">
```

---

```html
<label explicit="age">Age:</label>

<input type="number" id="age" name="age">
```

#### --answer--

```html
<label for="age">Age:</label>

<input type="number" id="age" name="age">
```

### --question--

#### --text--

What is an HTML validator used for?

#### --distractors--

A validator is a tool that automatically formats your HTML code.

---

A validator is a tool that applies styles to your HTML.

---

A validator is a tool that makes your HTML code run faster.

#### --answer--

A validator is a tool that checks the syntax of HTML code to ensure it is valid.

### --question--

#### --text--

Which element is used to define a cell in a table?

#### --distractors--

`th`

---

`tc`

---

`tcol`

#### --answer--

`td`

### --question--

#### --text--

Which of the following is a tool that allows you to inspect and modify the HTML structure of a web page?

#### --distractors--

DOM removal.

---

DOM tester.

---

DOM validation.

#### --answer--

DOM inspector.

### --question--

#### --text--

Which of the following is the correct way to group related input fields?

#### --distractors--

```html
<form>
  <fieldset>
    <caption>User information</caption>

    <label for="name">Name: </label>
    <input type="text" id="name" />

    <label for="email">Email: </label>
    <input type="email" id="email" />
  </fieldset>
</form>
```

---

```html
<form>
  <span>
    <p>User information</p>

    <label for="name">Name: </label>
    <input type="text" id="name" />

    <label for="email">Email: </label>
    <input type="email" id="email" />
  </span>
</form>
```

---

```html
<form>
  <fieldset>
    <title>User information</title>

    <label for="name">Name: </label>
    <input type="text" id="name" />

    <label for="email">Email: </label>
    <input type="email" id="email" />
  </fieldset>
</form>
```

#### --answer--

```html
<form>
  <fieldset>
    <legend>User information</legend>

    <label for="name">Name: </label>
    <input type="text" id="name" />

    <label for="email">Email: </label>
    <input type="email" id="email" />
  </fieldset>
</form>
```

### --question--

#### --text--

Which of the following is used to specify that an input field is read-only?

#### --distractors--

`readInputOnly`

---

`read-only`

---

`only-read`

#### --answer--

`readonly`

### --question--

#### --text--

Which attribute specifies that an input must be filled out before submitting the form?

#### --distractors--

`necessary`

---

`obligatory`

---

`essential`

#### --answer--

`required`

### --question--

#### --text--

What are Devtools used for?

#### --distractors--

These tools are built directly into the browser and they are used to spot any linting issues in your code.

---

These tools are built directly into the browser and are used to automatically format your code.

---

These tools are built directly into the browser and are used to help you ensure 100% test coverage for your code.

#### --answer--

These tools are built directly into the browser and are used to help you debug, profile, and analyze web pages.

### --question--

#### --text--

Which of the following is the correct way to disable an input?

#### --distractors--

```html
<input type="checkbox" disabling />
```

---

```html
<input type="checkbox" inputDisabled />
```

---

```html
<input type="checkbox" disabledInput />
```

#### --answer--

```html
<input type="checkbox" disabled />
```

### --question--

#### --text--

Which of the following is a valid value for the `type` attribute?

#### --distractors--

```html
<input type="time" />
```

---

```html
<input type="action" />
```

---

```html
<input type="capture" />
```

#### --answer--

```html
<input type="email" />
```

### --question--

#### --text--

Which of the following is the correct use of the `size` attribute?

#### --distractors--

```html
<input id="fullName" type="text" size=".001" />
```

---

```html
<input id="fullName" type="text" size="large" />
```

---

```html
<input id="fullName" type="text" size="10vh" />
```

#### --answer--

```html
<input id="fullName" type="text" size="10" />
```

### --question--

#### --text--

Which of the following attributes are used to specify the minimum and maximum number of characters required in an input field?

#### --distractors--

`minlen` and `maxlen`

---

`min` and `max`

---

`minimumLen` and `maximumLen`

#### --answer--

`minlength` and `maxlength`

### --question--

#### --text--

Which of the following button examples does **NOT** use a correct value for the `type` attribute?

#### --distractors--

```html
<button type="submit">Submit</button>
```

---

```html
<button type="button">Example Button</button>
```

---

```html
<button type="reset">Reset</button>
```

#### --answer--

```html
<button type="btn">Example Btn</button>
```

### --question--

#### --text--

Which of the following attributes is used to specify the value for a button?

#### --distractors--

`buttonValue`

---

`val`

---

`btnVal`

#### --answer--

`value`

## --quiz--

### --question--

#### --text--

What is the role of the `action` attribute inside of the opening `form` tag?

#### --distractors--

It is used to specify that an input field is read-only.

---

It is used to define the number of characters that should be visible as the user types into the input.

---

It is used to show a hint to the user to show them what to enter in the input field.

#### --answer--

It is used to specify the URL where the form data should be sent.

### --question--

#### --text--

Which of the following attributes is used to specify the HTTP method to use when sending the form data?

#### --distractors--

`set`

---

`type`

---

`http`

#### --answer--

`method`

### --question--

#### --text--

Which of the following is a common method used when working with forms?

#### --distractors--

`PUSH`

---

`SET`

---

`PULL`

#### --answer--

`GET`

### --question--

#### --text--

Which of the following is NOT a valid value for the `type` attribute?

#### --distractors--

`number`

---

`email`

---

`text`

#### --answer--

`http`

### --question--

#### --text--

Which of the following is the correct way to create a button in a form?

#### --distractors--

```html
<form>
  <input get="button" value="Show Alert" />
</form>
```

---

```html
<form>
  <input btn="button" value="Show Alert" />
</form>
```

---

```html
<form>
  <input set="button" value="Show Alert" />
</form>
```

#### --answer--

```html
<form>
  <input type="button" value="Show Alert" />
</form>
```

### --question--

#### --text--

What is implicit form association?

#### --distractors--

This is where inputs can be associated with labels by using the `action` and `for` attributes on the `label` element.

---

This is where inputs can be associated with labels by using the `required` and `for` attributes on the `label` element.

---

This is where inputs can be associated with labels by using the `for` attribute on the `label` element.

#### --answer--

This is where inputs can be associated with labels by wrapping the input field inside the `label` element.

### --question--

#### --text--

What is the role of the `fieldset` element?

#### --distractors--

It is used to group the header content in an HTML table.

---

It is used to create a label for an input field.

---

It is used to add a caption to describe the group of inputs.

#### --answer--

It is used to group related inputs together.

### --question--

#### --text--

Which of the following is used to create a checkbox in a form?

#### --distractors--

```html
  <input check="type" id="location" name="location" value="location" />
```

---

```html
  <input type="check" id="location" name="location" value="location" />
```

---

```html
  <input checkbox="type" id="location" name="location" value="location" />
```

#### --answer--

```html
  <input type="checkbox" id="location" name="location" value="location" />
```

### --question--

#### --text--

Which of the following elements is used to add a title for an HTML table?

#### --distractors--

`titles`

---

`title`

---

`captions`

#### --answer--

`caption`

### --question--

#### --text--

What is the role of the `legend` element?

#### --distractors--

It is used to group the body content in an HTML table.

---

It is used to add a caption to describe the cells for a table.

---

It is used to group related inputs together.

#### --answer--

It is used to add a caption to describe the group of inputs.

### --question--

#### --text--

Which of the following elements is used to group the header content in an HTML table?

#### --distractors--

`header`

---

`head`

---

`theader`

#### --answer--

`thead`

### --question--

#### --text--

Which of the following is the correct way to add rows and data cells to a table?

#### --distractors--

```html
<table>
  <tr>
    <data>Davis</data>
    <data>Alex</data>
    <data>54</data>
  </tr>
</table>
```

---

```html
<table>
  <tr>
    <cell>Davis</cell>
    <cell>Alex</cell>
    <cell>54</cell>
  </tr>
</table>
```

---

```html
<table>
  <row>
    <td>Davis</td>
    <td>Alex</td>
    <td>54</td>
  </row>
</table>
```

#### --answer--

```html
<table>
  <tr>
    <td>Davis</td>
    <td>Alex</td>
    <td>54</td>
  </tr>
</table>
```

### --question--

#### --text--

What is the DOM inspector?

#### --distractors--

A tool that is used to remove all elements from the DOM.

---

A set of tools built directly into the browser that helps you debug, profile, and analyze web pages.

---

A tool that checks the syntax of HTML code to ensure it is valid.

#### --answer--

A tool that allows you to inspect and modify the HTML structure of a web page.

### --question--

#### --text--

Which of the following is a tool that checks the syntax of HTML code to ensure it is valid?

#### --distractors--

HTML validate

---

HTML isValid

---

HTML valid

#### --answer--

HTML validator

### --question--

#### --text--

Which of the following is the correct way to specify the number of columns for data cell in a table?

#### --distractors--

```html
<td columns="2">Average Grade</td>
```

---

```html
<td col="2">Average Grade</td>
```

---

```html
<td column="2">Average Grade</td>
```

#### --answer--

```html
<td colspan="2">Average Grade</td>
```

### --question--

#### --text--

What is a focused state for an input field?

#### --distractors--

This is the state of an input field when the focus is removed by the user.

---

This is the state of an input field when it is set to readonly by the user.

---

This is the state of an input field when it is disabled by the user.

#### --answer--

This is the state of an input field when it is selected by the user.

### --question--

#### --text--

Which of the following is the correct way to create a radio button?

#### --distractors--

```html
<input id="no-option" select="radio" name="hotel-stay" />
```

---

```html
<input id="no-option" radio="type" name="hotel-stay" />
```

---

```html
<input id="no-option" type="radio-btn" name="hotel-stay" />
```

#### --answer--

```html
<input id="no-option" type="radio" name="hotel-stay" />
```

### --question--

#### --text--

What is the role of the `for` attribute? 

#### --distractors--

It is used to show a hint to the user.

---

It is used to specify the value of the input

---

It is used to create a label for an input field.

#### --answer--

It is used to specify which input field the label is for.

### --question--

#### --text--

Which of the following attributes is used to define the number of characters that should be visible as the user types into the input?

#### --distractors--

`setsize`

---

`sizing`

---

`sizes`

#### --answer--

`size`

### --question--

#### --text--

Which of the following attributes is used to show a hint to the user to show them what to enter in the input field?

#### --distractors--

`showhint`

---

`hint`

---

`clue`

#### --answer--

`placeholder`

---

## lab-survey-form

### Build a Survey Form
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a page title in an `h1` element with an `id` of `title`.
1. You should have a short explanation in a `p` element with an `id` of `description`.
1. You should have a `form` element with an `id` of `survey-form`.
1. Inside the form element you should have a required `input` field to enter your name that has an `id` of `name` and a `type` of `text`.
1. Inside the form element you should have a required `input` field to enter your email that has an `id` of `email`.
1. If you enter an email that is not formatted correctly, you should see an HTML5 validation error.
1. Inside the form element you should have an `input` field to enter a number that has an `id` of `number`.
1. The number input should not accept non-numbers, either by preventing you from typing them or by showing an HTML5 validation error (depending on your browser).
1. If you enter numbers outside the range of the number input, which are defined by the `min` and `max` attributes, you should see an HTML5 validation error.
1. For the name, email, and number input fields, you should have corresponding `label` elements in the form, that describe the purpose of each field with the following ids: `name-label`, `email-label`, and `number-label`.
1. For the name, email, and number input fields, you should have a placeholder text that gives a description or instructions for each field.
1. Inside the form element, you should have a `select` dropdown element with an `id` of `dropdown` and at least two options to choose from.
1. Inside the form element, you can select an option from a group of at least two radio buttons that are grouped using the `name` attribute.
1. Inside the form element, you can select several fields from a series of checkboxes, each of which must have a `value` attribute.
1. Inside the form element, you should have a `textarea` for additional comments.
1. Inside the form element, you should have a button with `id` of `submit` to submit all the inputs.

---

## html-and-accessibility

### What Is Accessibility?
Accessibility involves creating products and services that everyone can use. In the context of web development, it's making websites that everyone can understand and interact with, including people with visual, auditory, motor, and cognitive disabilities.

Some examples of disabilities that can impact users' online experience include:

- Blindness.
- Low vision.
- Color blindness.
- Deafness.
- Difficulty using keyboards, mice, or touchscreens.
- Attention disorders.
- Memory issues.
- Difficulty speaking or understanding spoken language.
- Sensitivity to flashing lights.

These are just a few of many conditions that can impact users around the world.

To help you create accessible websites, the World Wide Web Consortium, known as W3C, developed a set of international standards that you can follow to make your websites more accessible and easier to use for people with disabilities.

These standards are known as the "Web Content Accessibility Guidelines" (WCAG).

These guidelines are designed with four core principles in mind, known as **POUR**.

- `P` stands for Perceivable. Users must be able to perceive the information that you are presenting. For example, you can provide alternative text for images, so users who access your website with a screen reader can understand them.
- `O` stands for Operable. Users must be able to interact with the user interface. For example, you can make sure that all functionality is accessible through the keyboard too, not just the mouse.
- `U` stands for Understandable. Users must be able to understand the information. For example, you can avoid complex sentences and use simple language as much as possible.
- `R` stands for Robust. A wide range of browsers and other tools, including assistive technologies, must be able to interpret the content. 

Using semantic HTML is very helpful for making your website compatible with different browsers and assistive technologies.

If your content doesn't follow any one of these core principles, not everyone will be able to use your website.

To check if you are following these guidelines correctly, you can access the Quick Reference of the World Wide Web Consortium. There, you will find a comprehensive list of criteria and techniques.

Accessibility is essential for web development. By developing with inclusivity in mind, you can ensure that everyone can access and engage with your content, promote equality and create a better user experience for everyone around the world.

# --questions--

## --text--

What is the primary goal of web accessibility?

## --answers--

To make websites look better.

### --feedback--

Think about why you should make websites accessible.

---

To ensure websites are usable by everyone.

---

To improve website performance.

### --feedback--

Think about why you should make websites accessible.

---

To increase website traffic.

### --feedback--

Think about why you should make websites accessible.

## --video-solution--

2

## --text--

What are the Web Content Accessibility Guidelines (WCAG)?

## --answers--

A programming language for web development.

### --feedback--

Think about why you should make websites inclusive.

---

A set of guidelines for making websites accessible to everyone.

---

A new design trend for websites.

### --feedback--

Think about why you should make websites inclusive.

---

A tool for testing website performance.

### --feedback--

Think about why you should make websites inclusive.

## --video-solution--

2

## --text--

Which of the following is NOT a core principle of the Web Content Accessibility Guidelines (WCAG)?

## --answers--

Perceivable.

### --feedback--

Think about the essential principles of an accessible website, the guidelines that online content should follow.

---

Operable.

### --feedback--

Think about the essential principles of an accessible website, the guidelines that online content should follow.

---

Understandable.

### --feedback--

Think about the essential principles of an accessible website, the guidelines that online content should follow.

---

Compatible.

## --video-solution--

4

---

### What Are Screen Readers, and Who Uses Them?
Screen readers are assistive technology programs that help blind and visually impaired people use computers and mobile devices.

Screen readers are not just tools for the blind and visually impaired to access computers and mobile devices.

They empower these individuals to access education, work opportunities, and social media. This ensures digital inclusion and enhances their ability to participate fully in society.

There's a common misconception that screen readers are text-to-speech devices.

However, text-to-speech is just one of the features of a screen reader. Some screen readers even render the text to braille output instead of speech.

Apart from text-to-speech and braille output, other notable features of screen readers are navigation aids and web browsing assistance.

Screen reader programs are also not only made for the blind and visually impaired. Dyslexic individuals and people with cognitive disabilities also use screen readers. All the popular operating systems out there have screen readers built into them.

macOS and iOS both have VoiceOver built-in. You can enable it on your computer by pressing `CMD + F5`. You can access it on iPhones through Settings.

Windows computers have Narrator built-in. You can turn it on by pressing `WIN + CTRL + ENTER`. NonVisual Desktop Access (NVDA) and Job Access With Speech (JAWS) are also available for Windows computers. NVDA is free and open-source, while JAWS is paid.

Linux has _Orca_ for the desktop environment and _Speakup_ for the Linux terminal.

Android phones have TalkBack built-in. You can turn it on by accessing _Settings > Special Function > Accessibility > Talkback._

Some Android devices also have Ella and Select to Speak built in.

One major challenge for screen reader users is that many software developers don't design their products with screen-reader friendliness and accessibility in mind.

Even though accessibility is a broad topic, every developer needs to learn how to make their web software accessible for the blind and visually impaired, as well as other groups of people with disabilities.

This demonstrates empathy and a commitment to inclusivity, ensuring that all users can benefit from their work.

# --questions--

## --text--

Which of the following is the screen reader built into macOS and iOS devices?

## --answers--

Ella

### --feedback--

Think of the screen reader software Apple makes and maintains.

---

Speakup

### --feedback--

Think of the screen reader software Apple makes and maintains.

---

VoiceBox

### --feedback--

Think of the screen reader software Apple makes and maintains.

---

VoiceOver

## --video-solution--

4

## --text--

Which of the following are screen readers not made for?

## --answers--

The blind

### --feedback--

Look out for those with disabilities not related to vision.

---

Visually impaired people

### --feedback--

Look out for those with disabilities not related to vision.

---

The deaf

---

Dyslexic people

### --feedback--

Look out for those with disabilities not related to vision.

## --video-solution--

3

## --text--

Which of these is not a feature of screen readers?

## --answers--

Speech-to-text

---

Text-to-speech

### --feedback--

Think about what would not be useful to navigate a webpage without sight

---

Braille output

### --feedback--

Think about what would not be useful to navigate a webpage without sight

---

Web browsing support

### --feedback--

Think about what would not be useful to navigate a webpage without sight

## --video-solution--

1

---

### What Are Large Text or Braille Keyboards, and Who Uses Them?
Large text and braille keyboards are designed for users with visual disabilities. In Large Text Keyboards, also called Large Print Keyboards, the letters, numbers, and symbols are larger compared to standard keyboards. This design is helpful for people who may find smaller text in the keys difficult to see. Most of them also have enhanced contrast and brightness.

A large print keyboard made by the brand MaxiAids has yellow keys with black, big, and bold letters, numbers, and symbols on them. This is helpful for people with low vision.

Another keyboard is the black large print keyboard with white print on the keys. This keyboard is also backlit, so users can adjust its brightness to different lighting conditions.

While large print keyboards provide visual cues for users with low vision, braille keyboards provide a completely tactile experience for people with more severe vision disabilities, including people who are blind.

Braille is a tactile reading and writing system. It consists of raised dots arranged in specific patterns to represent letters, numbers, and punctuation.

Braille keyboards use this system to help users find the right keys on the keyboard by feeling these patterns with their fingers. The keys have raised dots in patterns that represent letters, numbers, and symbols.

And some keyboards combine both approaches: large fonts and braille patterns in the keys. This is helpful for people with visual disabilities and for people who are learning braille.

Large text and braille keyboards are tools that empower people with visual disabilities. By providing alternative input methods, these assistive technologies ensure that everyone can be part of the digital world.

# --questions--

## --text--

What is one benefit of using large text keyboards?

## --answers--

Improved typing speed.

### --feedback--

Think about the main purpose of large text keyboards.

---

Enhanced performance.

### --feedback--

Think about the main purpose of large text keyboards.

---

Improved readability of the keys.

---

Reduced noise levels.

### --feedback--

Think about the main purpose of large text keyboards.

## --video-solution--

3

## --text--

Who primarily benefits from the use of large text and braille keyboards?

## --answers--

People with hearing disabilities.

### --feedback--

Think about the type of disabilities that would make standard keyboards more challenging to use.

---

People with cognitive disabilities.

### --feedback--

Think about the type of disabilities that would make standard keyboards more challenging to use.

---

People with visual disabilities.

---

People with motor disabilities.

### --feedback--

Think about the type of disabilities that would make standard keyboards more challenging to use.

## --video-solution--

3

## --text--

How do people identify letters, numbers, and symbols in braille keyboards?

## --answers--

By feeling patterns of raised dots with their fingers.

---

By speaking into the keyboard.

### --feedback--

Think about how people with visual disabilities can interact with the braille keyboard.

---

By using a stylus.

### --feedback--

Think about how people with visual disabilities can interact with the braille keyboard.

---

By reading the keys.

### --feedback--

Think about how people with visual disabilities can interact with the braille keyboard.

## --video-solution--

1

---

### What Are Alternative Pointing Devices Such as Trackballs, Joysticks, and Touchpads Used For?
Alternative pointing devices are input devices that make good alternatives to the traditional mouse. They are essential for improving computer accessibility for those with disabilities, forelimb impairments, and limited mobility.

Common examples of alternative pointing devices are trackballs, joysticks, and touchpads.

A trackball is a stationary pointing device that consists of a large, movable ball within a socket. It also includes additional buttons for clicking and performing other functions.

Unlike the traditional mouse, which requires movement around a surface to control the cursor, a trackball remains in place. Users manipulate the ball directly with their fingers, thumb, or palm to move the cursor on the screen.

Some traditional mice also have a trackball on the top or side. These mice could make a good starting point if you want to gradually switch to a trackball.

Trackballs reduce the physical movement the user needs for navigation, making them ideal for users with mobility issues. 
Apart from that, if you need high precision and have limited desk space, a trackball is more ideal than a traditional mouse.

A joystick is a pointing device primarily designed for games and certain industrial applications like machinery control. It consists of a lever that pivots up, down, left, and right, and often includes additional buttons for various actions.

Joysticks provide precise control over movement and actions within digital environments. This makes them popular for flight simulators, cranes, driving games, and other applications requiring precise directional input.

Because joysticks accommodate larger and more deliberate movements, they are beneficial for individuals with tremors and unsteady hands.

They also reduce the strain and pain that comes with repetitive movements, making them ideal for individuals with arthritis and carpal tunnel syndrome.

A touchpad is a flat, touch-sensitive device built into laptops and some keyboards. It allows users to control the cursor on the screen by sliding their fingers across its surface.

Apart from the surface for cursor control, touchpads also feature buttons that emulate the actions of a traditional mouse, such as right-click and left-click.

Most people see touchpads as a better alternative to a mouse because they significantly enhance navigation by supporting multi-touch gestures like pinch-to-zoom, two-finger scrolling, tap-to-click, and three-finger swipes.

Touchpad is ideal for individuals with low arm or hand movement because the forelimb is almost always stationary while using it. It is also suitable for people with arthritis and joint pain because they don't get to move their arms too much.

# --questions--

## --text--

What kind of device are trackball, joystick, and touchpad?

## --answers--

Output devices

### --feedback--

Look out for the general name for the devices that help you interact with and control what appears on your screen.

---

Input/output devices

### --feedback--

Look out for the general name for the devices that help you interact with and control what appears on your screen.

---

Pointing devices

---

VDU devices

### --feedback--

Look out for the general name for the devices that help you interact with and control what appears on your screen.

## --video-solution--

3

## --text--

Which device supports multi-touch gestures like pinch-to-zoom, two-finger scrolling, tap-to-click, and three-finger swipes?

## --answers--

The traditional mouse

### --feedback--

Think about the device that allows for direct touch interactions and supports various gestures.

---

Touchpad

---

Joystick

### --feedback--

Think about the device that allows for direct touch interactions and supports various gestures.

---

Trackballs

### --feedback--

Think about the device that allows for direct touch interactions and supports various gestures.

## --video-solution--

2

## --text--

Which pointing device is primarily designed for games and specific industrial applications?

## --answers--

Joystick

---

Trackball

### --feedback--

Pointing device that provides precise control in gaming. Review the middle part of the lesson where this was discussed.

---

Mouse

### --feedback--

Pointing device that provides precise control in gaming. Review the middle part of the lesson where this was discussed.

---

Trackpad or touchpad

### --feedback--

Pointing device that provides precise control in gaming. Review the middle part of the lesson where this was discussed.

## --video-solution--

1

---

### What Are Screen Magnifiers Used For?
Screen magnifiers are tools that help people with low vision and other visual impairments better access digital content and the web.

Let's delve deeper into what these tools are and the role they play in digital content accessibility.

Screen magnifiers work by enlarging texts, graphics, and other elements on a computer or mobile device screen. Many screen magnifiers allow users to enlarge the display by more than 200%. Users can then navigate the page using their pointing device or keyboard. Additionally, most magnifiers offer customizable zoom percentages and other features in their settings.

Screen magnifiers primarily help people with low vision read text, as small fonts in documents or applications can be challenging for them. By enlarging the text, they can read emails, articles, and other content without straining their eyes. Screen magnifiers also assist with web browsing. They help users locate and click on buttons, links, and other interactive elements that might be difficult to see. This improved visibility ensures that users can browse websites, fill out forms, and engage in online activities without difficulty.

Therefore, software developers need to make their digital products accessible to people with low vision. Some considerations include:

- Using scalable fonts so the user can resize the page without the layout breaking.
- Ensuring the user interface adapts to different screen sizes through responsive design.
- Using high-contrast color schemes and customizable colors.
- Implementing a non-sticky and tiny navbar so users can still see content when using magnifiers.
- Using regular HTML text instead of images of text.
- Providing feedback directly next to the element that triggers it, and more.

All the mainstay Operating Systems have at least one magnifier built into them by their manufacturers:

- macOS and iOS both have Zoom. You can enable it on macOS by going to Settings, filter by Accessibility, and then click on "Zoom". Toggle the "Use keyboard shortcuts to zoom" option to enable it.
  - You can enable it on iPhone through _Settings > Accessibility > Zoom_.
- Android devices have Magnification. To turn it on, go to _Settings > Special Function > Accessibility > Magnification_. Since this may vary from device to device, you can search for "Magnification" on the settings homepage to access it.
- Windows has Magnifier. You can use it by going to _Settings > Ease of Access > Magnifier_.
- The magnifiers for Linux operating systems vary. It is either Zoom or Magnifier.

Apart from the ones built into operating systems, some useful third-party screen magnifiers are:

- ZoomText for Windows.
- ClaroView for both macOS and Windows.
- iZoom for Windows.
- Zoomify - Screen Magnifier for macOS.
- LunarPlus for Windows.
- Loupe for macOS.

# --questions--

## --text--

How do most screen magnifiers work?

## --answers--

By providing text-to-speech functionality.

### --feedback--

Focus on how screen magnifiers help users with low vision increase the size of various elements on their screens, not just text.

---

By enlarging the texts, graphics, and other elements on a computer or mobile device screen.

---

By providing a ruler around every element on the page.

### --feedback--

Focus on how screen magnifiers help users with low vision increase the size of various elements on their screens, not just text.

---

By enlarging only the texts on a screen for better visibility.

### --feedback--

Focus on how screen magnifiers help users with low vision increase the size of various elements on their screens, not just text.

## --video-solution--

2

## --text--

Which of these should a developer do to make their digital products friendly to screen magnifiers?

## --answers--

Use big fonts only.

### --feedback--

Think about how content adjusts to different screen sizes for better responsiveness.

---

Disable zooming to keep the layout intact.

### --feedback--

Think about how content adjusts to different screen sizes for better responsiveness.

---

Rely only on images to convey information.

### --feedback--

Think about how content adjusts to different screen sizes for better responsiveness.

---

Make their pages respond to different screen sizes.

## --video-solution--

4

## --text--

Which of the following is a third-party screen magnifier?

## --answers--

Zoom

### --feedback--

Refer to the end of the lesson for the answer.

---

Loops

### --feedback--

Refer to the end of the lesson for the answer.

---

ZoomText

---

Loup

### --feedback--

Refer to the end of the lesson for the answer.

## --video-solution--

3

---

### What Is Voice Recognition Software Used For?
Voice recognition software helps people with disabilities interact with computers and other digital devices. Let's discuss what voice recognition software is and the role it plays in digital inclusion.

In the context of accessibility, voice recognition tools let people with disabilities use their voice to pass commands to perform various tasks instead of using traditional input devices like keyboards and mice. This includes writing emails and other documents, surfing the net, and controlling smart home devices.

Because voice recognition software tools eliminate the need for physical interaction, they empower people with disabilities with significant independence and control over their environment. 

Here are the specific people who may find voice recognition software significantly helpful:

- People with visual impairments, including those with low-vision or blindness.
- Individuals with mobility impairments, such as limited use of hands and arms or conditions like arthritis and carpal tunnel syndrome.
- Those recovering from hand or arm injuries.
- Individuals with cognitive disorders, like memory issues or attention deficit disorders.
- Elderly individuals who might find it easier to use voice commands.

Note that people with disabilities are not the only ones who use voice recognition technology. Law enforcement agencies, gamers, drivers, and busy professionals also use voice recognition tools.

A few examples of voice recognition software that allows people to interact with their computer include Voice Control for macOS/iOS, Voice Access for Android, and Windows Speech Recognition for Windows (referred to as Voice Access in the most recent versions of Windows). Dragon by Nuance is a popular third-party voice recognition software for Windows.

# --questions--

## --text--

What are the main input devices that voice recognition software replaces?

## --answers--

Fingerprint readers.

### --feedback--

Focus on the types of tasks voice recognition software is typically used for, and the input devices it can replace in those instances.

---

Image scanners.

### --feedback--

Focus on the types of tasks voice recognition software is typically used for, and the input devices it can replace in those instances.

---

Keyboards and mice.

---

Webcams.

### --feedback--

Focus on the types of tasks voice recognition software is typically used for, and the input devices it can replace in those instances.

## --video-solution--

3

## --text--

Which of the following would be the least likely to benefit from voice recognition software?

## --answers--

Elderly people.

### --feedback--

Focus on the purpose of voice recognition software in enhancing accessibility for various disabilities.

---

People with mobility impairments.

### --feedback--

Focus on the purpose of voice recognition software in enhancing accessibility for various disabilities.

---

People with low leg movement.

---

People with visual impairments.

### --feedback--

Focus on the purpose of voice recognition software in enhancing accessibility for various disabilities.

## --video-solution--

3

## --text--

Which of the following is not voice recognition software?

## --answers--

Dragon.

### --feedback--

Most voice recognition software, especially ones that come bundled with operating systems, often include words like "control" or "access". Focus on the options that don't follow this convention.

---

Audacity.

---

Voice Control.

### --feedback--

Most voice recognition software, especially ones that come bundled with operating systems, often include words like "control" or "access". Focus on the options that don't follow this convention.

---

Voice Access.

### --feedback--

Most voice recognition software, especially ones that come bundled with operating systems, often include words like "control" or "access". Focus on the options that don't follow this convention.

## --video-solution--

2

---

### What Are Some Common Accessibility Auditing Tools to Use?
Accessibility is a crucial yet often overlooked aspect of digital content. When making your digital content accessible, it's important to ensure it meets accessibility standards.

An accessibility auditing tool is an application that helps you improve the accessibility of your digital content by reporting accessibility issues that can be easily found through automated testing. This content includes websites, web applications, and mobile apps.

It is important to note that while automated accessibility tools have a role in improving accessibility, they typically will only find about a third of all possible accessibility issues. Therefore, it is important not to rely on them entirely to evaluate the accessibility of your content. Manual testing, preferably by people with disabilities, will always be required to ensure that your content is as accessible as possible.

Let's look at some free tools that can help you improve the accessibility of your digital content.

Google Lighthouse is a popular web metric checker you can use directly within Chrome DevTools or online. This means you can check not only live websites but also locally-developed ones.

The metrics you can check include accessibility, SEO, best practices, and performance.

To use Lighthouse, open your DevTools by pressing `F12` and switching to the Lighthouse tab.
Select the metrics you want to check, choose the device you want to test on, and click the "Analyze page load" button.

An accessibility score will appear after the check is complete, along with a list of any issues that need fixing.

If you want more reliable metrics, consider using the web version. The downside is that it doesn't support testing local websites. You can access the web version on `pagespeed.web.dev`.

WAVE is another reliable accessibility checker you can use as a Chrome extension or on the web. All you need to do is enter the URL of your website and a comprehensive accessibility report will be generated for you. This report includes accessibility features implemented, ARIA, and contrasts.

The IBM Equal Access Accessibility Checker is another robust tool for improving digital content accessibility. With it, you can scan your websites for accessibility issues and generate a detailed report.

You can use it as a Chrome extension or Firefox add-on.

To use the IBM Accessibility Checker as a Chrome extension, download it from the Chrome web store. Open your Devtools by pressing `F12` and selecting the "Accessibility Checker" tab located in the Elements panel. Click the scan button to start the check and a report will be generated for you. You can export the report as a spreadsheet and an HTML file by clicking the "Export XLS" button.

Please keep in mind, while these automated tools help you make your content more accessible, a perfect score from any of them does not mean that your content is entirely accessible. The range of issues that these tools test for is limited, and manual testing will always be needed to ensure a more accessible experience for everyone.

# --questions--

## --text--

Which of these best describes an accessibility auditing tool?

## --answers--

It automatically fixes all accessibility issues.

### --feedback--

Consider the role of the tool in assessing accessibility.

---

It evaluates how accessible your digital content is.

---

It only checks mobile apps.

### --feedback--

Consider the role of the tool in assessing accessibility.

---

It requires no manual input.

### --feedback--

Consider the role of the tool in assessing accessibility.

## --video-solution--

2

## --text--

Which of these describes how you can use the IBM Equal Access Accessibility Checker?

## --answers--

It can be used only as a desktop application.

### --feedback--

Think about the different ways you can integrate it into your workflow.

---

It can be used without any development integration.

### --feedback--

Think about the different ways you can integrate it into your workflow.

---

It's exclusively for mobile apps.

### --feedback--

Think about the different ways you can integrate it into your workflow.

---

It can be used as a Chrome extension, Firefox add-on, or NPM package.

## --video-solution--

4

## --text--

Which of these is a limitation of using the web version of the tool on Google Lighthouse?

## --answers--

It provides unreliable metrics.

### --feedback--

Think about what the web version of Lighthouse cannot do with certain types of websites.

---

It can only test local websites.

### --feedback--

Think about what the web version of Lighthouse cannot do with certain types of websites.

---

It cannot test local websites.

---

It doesn't support mobile testing.

### --feedback--

Think about what the web version of Lighthouse cannot do with certain types of websites.

## --video-solution--

3

---

### How Does Proper Heading Level Structure Affect Accessibility?


---

### Step 1
Camperbot has created a coding journey blog page, but it looks like the page has some accessibility issues and bad practices. Your job in this workshop, is to fix these issues for Camperbot.

The first set of errors has to deal with the use of headings. In a prior lesson, you learned that it is best practice to only use one `h1` per page. But it looks like Camperbot is a using a few `h1`s. 

Leave the `<h1>Welcome to Camperbot's Blog</h1>` alone and change the other `h1` elements to `h2` elements.

---

### Step 2
It looks like there are still some issues with the use of headings on the page. If you look at the first `div` element, there are two `h4` elements used as subheadings. A better practice would be to use `h3` elements for these subheadings since they are a level below the `h2` element.

Change the two `h4` elements to `h3` elements.

---

### Step 3
In the second post section, there is an `h5` element being used. It would be more appropriate to use an `h3` element here. 

Change the `h5` element to an `h3` element.

---

### Step 4
Below the main title of the page, there is a navigation section that contains links to each blog post. 

This section should be wrapped in a `nav` element to indicate its purpose as a navigation landmark.

---

### Step 5
In the blog page, there are a total of three blog posts wrapped inside generic `div` elements. But it would be better to use semantic elements to wrap each post. 

Change each `div` element that wraps each blog post to an `article` element.

---

### Step 6
Since the entire section containing the blog posts represents the main content of the page, it should be wrapped in a `main` element. This helps screen readers and other assistive technologies understand the structure of the page better.

---

### Step 7
For the last part of the workshop, there are a few changes needed for the contact section at the bottom.

The first change would be to wrap the contact section inside of a `footer` element. This will help screen readers identify this section as the footer of the page.

---

### Step 8
Right now the `footer` section has an `h3` heading. But it should be an `h2` heading to maintain a proper heading hierarchy. 

Change the `h3` to an `h2`.

---

### Step 9
The last change will be to the email text inside of the footer. In earlier lessons and workshops, you learned how to work with the `mailto` link like this:

```html
<p>Email me at <a href="mailto:janedoe@email.com">janedoe@email.com</a></p>
```

Start by wrapping the `camperbot@blog.io` email address inside of an anchor element. Then, add the `href` attribute to the anchor element and set it equal to `mailto:camperbot@blog.io`.

With that last change, you have successfully resolved all of the issues in the blog page!

---

### What Are Best Practices for Tables and Accessibility?


---

### Why Is It Important for Inputs to Have an Associated Label?


---

### Step 1
In this workshop, you will learn how to make accessible table elements by building out a schedule for a tech conference.

Start by adding an `h1` element with the text `Tech Conference 2025 Schedule`.

---

### Step 2
Now it is time to start building out the table. 

Start by adding a `table` element below your `h1` element. Inside of the `table` element, add a `caption` element with the text `Schedule by Track and Time`.

---

### Step 3
The next step is to add the table head. 

Start by adding a `thead` element below the `caption` element. Inside the `thead`, add a `tr` element.

---

### Step 4
Inside of your `tr` element, add four `th` elements. The first `th` element should have the text of `Time`, the second should have the text of `Track A`, the third should have the text of `Track B`, and the fourth should have the text of `Track C`.

---

### Step 5
The `scope` attribute is used to specify whether a header cell is a header for a row, column, or group of rows or columns. Here is an example:

```html
<th scope="col">Example Header</th>
```

This helps screen readers understand the relationship between header and data cells.

For all `th` elements, add a `scope` attribute with a value of `col`.

---

### Step 6
For the next few steps, you will build out the body of the table.

Start by adding a `tbody` element below the `thead` element. Then inside the `tbody`, add a `tr` element.

---

### Step 7
Inside your `tr` element, add a `th` element with the text of `9:00 AM`. Then below that `th` element, add three `td` elements with the text of `Keynote: Tech Future`, `Intro to Web Dev`, and `UX for All`.

---

### Step 8
Another value for the `scope` attribute is `row`, which indicates that a header cell is a header for its entire row.

Inside of your `th` element, add a `scope` attribute with a value of `row`.

---

### Step 9
Now it is time to add another row to the table. 

Start by adding another `tr` element. Inside that `tr` element, add a `th` element with a `scope` attribute set to `"row"` and the text content of `10:00 AM`. 

Then, add three `td` elements with the following text content:

- `Accessibility Deep Dive`
- `CSS for Beginners`
- `Inclusive Design Principles`

---

### Step 10
Next, add a third row to the table. Start by adding another `tr` element. Inside that `tr` element, add a `th` element with a `scope` attribute set to `"row"` and the text content of `11:00 AM`. Then below that `th` element, add a `td` element with the text content of `Break`.

---

### Step 11
Right now, the `td` element with the text content of `Break` only spans one column. But it would be nice if it spanned all three columns. 

As you recall from earlier workshops and lessons, you can use the `colspan` attribute to make a table cell span multiple columns.

```html
<tr>
  <td colspan="3">Total Points</td>
</tr>
```

Add a `colspan` attribute to the `td` element and set its value to `3`.

---

### Step 12
Now it is time to add another row to the table. 

Start by adding another `tr` element. Inside that `tr` element, add a `th` element with a `scope` attribute set to `"row"` and the text content of `11:30 AM`. 

Then, add three `td` elements with the following text content:

- `AR/VR in Education`
- `JavaScript Fundamentals`
- `Design Systems at Scale`

---

### Step 13
Next, add a fifth row to the table. Start by adding another `tr` element. Inside that `tr` element, add a `th` element with a `scope` attribute set to `"row"` and the text content of `12:30 PM`. Then below that `th` element, add a `td` element with the text content of `Lunch Break`. Your `td` element should also have a `colspan` attribute set to `3` so that it spans all three tracks.

---

### Step 14
The last step is to add one more row to the table.

Start by adding another `tr` element. Inside that `tr` element, add a `th` element with a `scope` attribute set to `"row"` and the text content of `2:00 PM`. 

Then, add three `td` elements with the following text content:

- `Voice UI Workshop`
- `Git & GitHub Essentials`
- `Color & Contrast in UI`

With those last set of changes, your table is now complete!

---

### Debug a Donation Form
A local charity has built a donation form website, but there are several issues that need to be fixed. The form isn't accessible and has some HTML syntax errors.

Your job is to fix all of the errors so the form works correctly and is accessible to all users. Complete the items in the user stories below and click "Check Your Code" to see if you fixed all the errors.

**User Stories:**

1. The `input` elements are void elements and should not have closing tags. Remove all `</input>` closing tags from the form.
2. Add `label` elements for each form input field so users know what each field is for. The label text should match what's currently next to each input.
3. The `Email Address:` input type should be an `email` instead of `text`.
4. You should associate each `label` element with its corresponding `input` element using the `for` attribute on the `label` and a matching `id` attribute on the `input`.
5. Add the `required` attribute to the text, email, and number input fields (but not the checkbox or submit button) to ensure users fill in the required information.

---

### What Is the Purpose of WAI-ARIA, and How Does It Work?


---

### What Are ARIA Roles?


---

### What Are the Roles of the aria-label and aria-labelledby Attributes?


---

### What Is the aria-hidden Attribute, and How Does It Work?


---

### What Is the aria-describedby Attribute, and How Does It Work?


---

### Step 1
In this workshop, you will practice working with ARIA by building an accessible audio controller.

To start, add an `h1` element with the text `Audio Controls`.

---

### Step 2
Next, add a `button` element with the `type` attribute set to the value `button`.

The `button` element's text should be `Play`.

---

### Step 3
Next, add a `div` element to contain all the elements for the volume control.

Inside the `div` element, nest a `span` element with an `id` attribute set to `volume-label`.
Also, the text for the `span` element should be `Volume`.

The `id` will later be referenced by ARIA attributes so assistive technologies can identify this text as the label for the volume control.

---

### Step 4
Now it is time to add another `span` element.

This `span` element should have an `id` attribute set to `volume-description`.
Also, the text for this `span` element should be `Adjust the sound level`.

Similar to the previous `span` element, the `id` of this `span` will later be referenced by ARIA attributes so assistive technologies can identify this text as the description for the volume control.

---

### Step 5
Next, you need to add an `input` element with the `type` attribute set to `range` to create the volume slider. Set the `min` attribute to `0`, the `max` attribute to `100`, and the `value` attribute to `50` to define the default volume level.

---

### Step 6
As you recall from prior lessons, the `aria-labelledby` attribute is used when there is existing text on the page that can be used as a label. In this case, you have added the `id` attribute to your `span` elements which will now be used here.

Add an `aria-labelledby` attribute to the `input` element set to `volume-label volume-description`.

---

### Step 7
Your accessible audio controller is almost complete but there is one last thing to add.

Add a `button` element with the `type` attribute set to `button` and with text `Mute` below the `div` element.

And with that change, you have completed this workshop!

---

### When Is the alt Attribute Needed, and What Are Some Examples of Good Alt Text?
Alternative text, often abbreviated as `alt` text, is a brief text description of an image. It provides essential information about the image for users who cannot see it, such as people who use screen readers and other assistive technologies.

It's essential for making websites accessible to people with visual disabilities.

Alternative text is also used by search engines to understand images. Some browsers may also display it when an image is not loaded properly. This can happen when the image file is missing or when the user has connectivity issues. So it's helpful for many different purposes.

A person with a visual disability will not be able to know what's in the image unless it's described in the alt text. An example of bad alt text for an image of a puppy would be "A cute puppy."

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/puppy.png" alt="A cute puppy." />

This text is not specific enough to convey the important details of the image, like what does the puppy look like? Where is the puppy? Are there any important objects around the puppy?

Let's improve this. An example of good alternative text would be: "A black and white puppy with an orange collar lies on its belly in the sand, looking off to the side. A bright orange ball rests near its front paws."

Here you can see this in HTML with an image element, the `alt` attribute, and a more detailed description:

```html
<img src="puppy.png" alt="A black and white puppy with an orange collar lies on its belly in the sand, looking off to the side. A bright orange ball rests near its front paws." />
```

It is important to note that there is no one correct way to write alt text for an image. What you include in your description will depend on the context the picture is used in. For example, if the puppy picture was on a website about dog breeds, you might want to include more specifics about the physical description of the puppy and possibly ignore the fact that the puppy is at the beach playing with an orange ball. Ultimately, the `alt` text you use for an image should reflect the primary purpose for including the image on the page, and the information you provide should give people who can't see the image the necessary details to understand that purpose.

Here we have another example of a beautiful tropical resort. Let's describe it.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/resort.jpg" alt="Resort.">

An example of bad `alt` text for this image would be "Resort."

This is too short and it doesn't provide enough information about the image. To improve this description, you could expand it to include the most important elements of the image:

"Tropical resort featuring a swimming pool surrounded by palm trees and bungalows."

You can use the alt attribute in HTML like this:

```html
<img src="resort.png" alt="Tropical resort featuring a swimming pool surrounded by palm trees and bungalows." />
```

Now that you know what makes good and bad `alt` text, let's see some of the best practices.

- You should try to keep `alt` text short. It should be detailed enough to understand the image but not so long that it becomes confusing.
- You should not try to describe every little detail. Focus on the most important aspects of the image.
- Generally, you don't need to start with "image of" or "picture of." You can just start the description directly.
- Also, if there's similar text around the image, you don't need to write it again.
- It's usually recommended to end the alt text with a period for consistency.
- If the image is a link to another page, instead of describing the image itself, the `alt` text should describe what will happen if users click on it.

For example, if your website has a right arrow icon that takes the user to the next page, instead of writing an alt text that only says "right arrow", like in this example, where you can see the alt attribute with this description:

```html
<a href="about.html">
  <img src="arrow-right.png" alt="Right arrow." />
</a>
```

You should write something like this instead, where the `alt` text describes what will happen if users clicks on the image. They will go to the next page.

```html
<a href="about.html">
  <img src="arrow-right.png" alt="Go to next page." />
</a>
```

Only images that convey important information should have `alt` text. If an image is only used for decorative purposes, it should have `null` (empty) `alt` text, so it can be ignored by screen readers and other assistive technologies.

Here is an example of an empty `alt` attribute:

```html
<img src="decorative_image.jpg" alt="" />
```

Every image on your website should have an `alt` attribute, even if it's empty. If you omit the `alt` attribute completely, some screen readers will read the file name instead, which can be distracting for people who use assistive technologies, so this is not recommended.

Finally, before your website is live, you should carefully test if screen readers can read the `alt` text correctly.

Writing effective `alt` text is essential for creating accessible web content. As a web developer, by providing clear descriptions of your images, you can make sure that everyone can engage with your website in an inclusive online experience.

# --questions--

## --text--

What is the purpose of alt text in an image?

## --answers--

To improve the appearance of an image.

### --feedback--

Think about why images should be accessible and why these descriptions are important.

---

To provide a decorative element to the webpage.

### --feedback--

Think about why images should be accessible and why these descriptions are important.

---

To describe the image for people with visual disabilities.

---

To increase website loading speed.

### --feedback--

Think about why images should be accessible and why these descriptions are important.

## --video-solution--

3

## --text--

When is it appropriate to leave the alt text empty for an image?

## --answers--

When the image is purely decorative.

---

When the image is important to understand the content.

### --feedback--

Think about the role of the image on the page.

---

When the image is small.

### --feedback--

Think about the role of the image on the page.

---

Always, to improve website performance.

### --feedback--

Think about the role of the image on the page.

## --video-solution--

1

## --text--

What should be the primary focus of the alt text for an image that acts as a link?

## --answers--

Describing the image visually.

### --feedback--

Think about the purpose of alt text and how it relates to links.

---

Indicating the link's destination.

---

Combining both the image description and link destination.

### --feedback--

Think about the purpose of alt text and how it relates to links.

---

The alt text is not important for images that are links.

### --feedback--

Think about the purpose of alt text and how it relates to links.

## --video-solution--

2

---

### What Are the Accessibility Benefits for Good Link Text, and What Are Examples of Good Link Text?
Let's take a look at the benefits of writing good link texts in the context of accessibility, and some examples of good link texts.

The first visible benefit of a good link text is that it makes it easier for everyone to find information quickly. Descriptive links help users know where they're headed and what they'll access. This ensures the user doesn't feel lost and improves the overall user experience.

For those using screen readers, a clear and descriptive link text is a must. Screen readers read the link text aloud, so a text like "Read our accessibility guide" is way better than "Click here."

Making link text clear and descriptive isn't just beneficial for those living with visual impairments. Descriptive links also help people with cognitive disabilities by providing clear context.

Here are some best practices to keep in mind while writing link texts:

- Make sure links are visually distinct by using underlining and other visual cues, so users can easily identify and navigate them.
- Avoid generic link texts like "here", "click here", and "more-info" as they don't provide any useful information.
- Aim for concise and descriptive link texts, ideally between 2-5 words, that convey the link's purpose.
- Avoid jargon and abbreviations that users may not understand.
- Focus on the destination, not the action. For example, "user behavior results", instead of "click here to read more".
- Don’t repeat the same link text for different destinations.
- Place links in a way that they make sense within the surrounding text. For example, "for more details, visit our events page" instead of "Click here for more".

Here are some examples of good link texts for specific use cases, compared to less helpful ones.
Let's say you want to link to a page providing details about an event like this:

```html
<a href="webinar-details-link">Details</a>
```

`Details` is vague and doesn’t provide specific information about what the user will find if they click the link. Without additional context, users might not know if the link leads to details about a webinar, a product, a policy, or something else.

Now, here is an example of good link text:

```html
<a href="webinar-details-link">
  Get details about our upcoming webinar
</a>
```

This link text gives users context about the content they will find, making it easier to decide whether they want to click on it. It reduces ambiguity by specifying that the link is related to a webinar.

Here is another example linking to a post in a blog:

```html
<a href="/blog-post-link">Read more</a>
```

The link text `Read more` is not ideal in terms of accessibility because it lacks context.

Here is a better link text example:

```html
<a href="/blog-post-link">
   Read our latest blog post on web accessibility
</a>
```

This updated link text provides users with a clearer idea of what to expect and why they might want to click the link, which is particularly important for those using screen readers.

Let's take a look at one more example. Let's say you want to provide more information about a certain topic:

```html
<a href="/link-to-topic">More info</a>
```

`More info` is also vague and can be problematic for accessibility. It doesn't provide specific details about the link's destination, which can be confusing for users relying on screen readers or those who might be navigating the site in a non-linear way.

Here is a better example for link text:

```html
<a href="/link-to-topic">
   Learn more about our accessibility efforts
</a>
```

This updated link text is better because it clearly describes what the user will find if they click the link. Users can immediately understand that the link leads to information about your accessibility efforts.

# --questions--

## --text--

Why is clear and descriptive link text essential for those using screen readers?

## --answers--

It enhances the visual appeal of the website.

### --feedback--

Think about what helps users understand the purpose of the link when it's read aloud.

---

It helps users understand the purpose of the link when navigating with a screen reader.

---

It speeds up the loading speed of the website.

### --feedback--

Think about what helps users understand the purpose of the link when it's read aloud.

---

It reduces the number of links on a page.

### --feedback--

Think about what helps users understand the purpose of the link when it's read aloud.

## --video-solution--

2

## --text--

What's the first visible benefit of a good link text?

## --answers--

It helps users know where they're headed and what they'll access.

---

It improves the aesthetics of the web page.

### --feedback--

Think about what makes finding information easier and improves user experience.

---

It increases the loading speed of the page.

### --feedback--

Think about what makes finding information easier and improves user experience.

---

It reduces the number of links on a page.

### --feedback--

Think about what makes finding information easier and improves user experience.

## --video-solution--

1

## --text--

Which of the following is a best practice for writing link texts?

## --answers--

Use generic texts like "click here" to keep it simple.

### --feedback--

Think about what helps users identify and understand the link's purpose quickly.

---

Repeat the same link text for different destinations.

### --feedback--

Think about what helps users identify and understand the link's purpose quickly.

---

Make links visually distinct with underlining and other visual cues.

---

Focus on the action rather than the destination, like "click here to read more".

### --feedback--

Think about what helps users identify and understand the link's purpose quickly.

## --video-solution--

3

---

### What Are Good Ways to Make Audio and Video Content Accessible?


---

### What Are Some Ways to Make Web Applications Keyboard Accessible?


---

### Build a Checkout Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have an `h1` element with the text `Checkout`.
1. You should have two `section` elements immediately after the `h1` element.
1. You should have an `h2` element with the text `Your Cart` within the first section.
1. You should have an image of an item in the first section with appropriate alternate text. You can use this image if you would like: `https://cdn.freecodecamp.org/curriculum/labs/cube.jpg`
1. You should have an `h2` element with the text `Payment Information` within the second section.
1. You should have a `form` element within the second section.
1. You should have an input with an `id` and `name` of `card-name`, and a `type` of `text` within your form and a `label` associated with it.
1. You should have an input with an `id` and `name` of `card-number`, and a `type` of `text` within your form and a `label` associated with it.
1. You should have at least two `input` elements with the `required` attribute.
1. You should include a `span` element with the text `*` and `aria-hidden` set to `true` inside the `label` element for each required input, so that required fields are visually indicated.
1. You should have a `p` element with a help text that explains the required card number format, placed immediately after the card number input. The `p` should have an `id` of `card-number-help` and be referenced by the card number input using `aria-describedby`.

---

### Design a Movie Review Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab. 

**User Stories:**

1. You should have a `main` element.
2. Inside the `main` element, you should have an `h1` element for the movie title.
3. Below the `h1` element, you should have an `img` element displaying the movie cover. Your `img` element should have a descriptive `alt` text describing the image. You are free to use the following image if you like: `https://cdn.freecodecamp.org/curriculum/labs/rise-beyond-2.png`.
4. You should have a `p` element containing a brief movie description.
5. You should have another `p` element to display the movie rating. Within it, you should have these items in the listed order:
   - A `b` element with the text `Movie Rating:`.
   - A `span` element with an `aria-hidden` attribute set to `true` containing a visual representation of the rating using stars `⭐⭐⭐⭐⭐⭐⭐⭐⭐☆`.
   - A numerical value, representing the rating, in parentheses (e.g. `9.2/10`) after the span.
6. You should have an `h2` element with the text `Cast Members`.
7. You should have a `ul` element.
8. Inside the `ul` element, you should have multiple `li` elements each containing a `b` element for the actor's name followed by the corresponding character name preceded by the text `as`. (e.g., `James Holloway as Ethan Carter`).

---

### Build a Multimedia Player
In the prior lessons, you were introduced to working with `audio` and `video` elements. In this lab, you will build out a multimedia player that will display an `audio` track and `video` with a transcript.

For the `audio` element, you will need to include a `source` element which is used to specify the media being used. 

Here is an example:

```html
<audio controls aria-label="descriptive label goes here">
  <source src="url-to-audio-goes-here" type="audio/mpeg">
</audio>
```

The `source` element can also be used in the `video` element like this:

```html
<video controls width="600" aria-label="descriptive label goes here">
  <source src="link-to-mp4-goes-here" type="video/mp4">
  <!-- Remaining code goes here -->  
</video>
```

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have an `h1` element for the main title of the page.
2. You should have three `section` elements.
3. Inside the first `section` element, you should have an `h2` element for the title of song playing.
4. Below the `h2` element, you should have an `audio` element with `controls` attribute and an `aria-label` attribute.
5. Inside the `audio` element, you should have a `source` element with a `src` attribute pointing to an audio file and a `type` attribute. You are free to use this audio URL if you like: `https://cdn.freecodecamp.org/curriculum/js-music-player/sailing-away.mp3`
6. Inside the second `section` element, you should have an `h2` element for the title of the video playing.
7. Below the `h2` element, you should have a `video` element with `controls`, `width` attributes and an `aria-label` attribute.
8. Inside the `video` element, you should have a `source` element with a `src` attribute pointing to a video file and a `type` attribute. You are free to use this video URL if you like: `https://cdn.freecodecamp.org/curriculum/labs/what-is-the-map-method-and-how-does-it-work.mp4`
9. Below the `source` element, you should have a `track` element with a `src` attribute pointing to a subtitles file and a `kind` attribute, a `srclang` attribute and a `label` attribute. You are free to use this subtitles URL if you like: `https://cdn.freecodecamp.org/curriculum/labs/what-is-the-map-method-and-how-does-it-work.vtt`
10. Inside the third `section` element, you should have an `h2` element for the title of the section eg. "Transcript".
11. Below the `h2` element, you should have a `p` element with the transcript of the video.

---

### HTML Accessibility Review


---

### HTML Accessibility Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What is accessibility?

#### --distractors--

Accessibility is a set of standardized practices that ensures your code is free from all security risks.

---

Accessibility is a set of standardized practices that enhances the speed and performance for your web applications.

---

Accessibility is a set of standardized practices that ensures your code meets 100% test coverage.

#### --answer--

Accessibility is a set of standardized practices to ensure your web applications can be used by everyone, including those with disabilities.

### --question--

#### --text--

Which of the following is a good example for proper heading level structure?

#### --distractors--

```html
<h3>Heading 3</h3>
<h3>Heading 3</h3>
<h3>Heading 3</h3>

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h4>Heading 4</h4>
```

---

```html
<h6>Heading 6</h6>

<h1>Heading 1</h1>
<h1>Heading 1</h1>

<h5>Heading 5</h5>

<h2>Heading 2</h2>
<h2>Heading 2</h2>
```

---

```html
<h6>Heading 6</h6>
<h5>Heading 5</h5>
<h4>Heading 4</h4>
<h3>Heading 3</h3>
<h2>Heading 2</h2>
<h1>Heading 1</h1>
```

#### --answer--

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

### --question--

#### --text--

What are the six main categories of ARIA roles?

#### --distractors--

Document Structure, Landmark, Window, Explicit, Fidget, and Footer.

---

Landmark, House, Live Region, Application, Window, and Extension.

---

Window, Alert Dialog, Article, Cell, Banner, and Button.

#### --answer--

Document Structure, Landmark, Window, Abstract, Widget, and Live Region.

### --question--

#### --text--

What is the correct way to add an `alt` attribute to an `img` element?

#### --distractors--

```html
alt="cat running"<img src="cat.jpg">
```

---

```html
alt=""<img src="cat.jpg">
```

---

```html
<img src="cat.jpg"> alt="cat running"
```

#### --answer--

```html
<img src="cat.jpg" alt="cat running">
```

### --question--

#### --text--

What does WAI-ARIA stand for?

#### --distractors--

Website Accessible Initiative - Accessible Rust Internet Applications.

---

Web Anchor Initiative - Anchor Rich Internet Applications.

---

Web Accessibility Initial - Accessible Ready Internet Applications.

#### --answer--

Web Accessibility Initiative - Accessible Rich Internet Applications.

### --question--

#### --text--

What is the role of the `aria-hidden` attribute?

#### --distractors--

This attribute is used to hide elements only for users with visual impairments.

---

This attribute is used to hide and add label text for an element.

---

This attribute is used to hide an element only to keyboard users.

#### --answer--

This attribute is used to hide an element from assistive technologies.

### --question--

#### --text--

Which attribute makes elements focusable and defines the relative order in which they are navigated using the keyboard?

#### --distractors--

`keyboardindex`

---

`tabbingindex`

---

`indextab`

#### --answer--

`tabindex`

### --question--

#### --text--

Why is it a good practice to include the `caption` element inside an HTML table?

#### --distractors--

It enhances the table's appearance by adding a decorative header.

---

It allows users to easily sort and filter the table's data.

---

It helps improve the table's responsiveness on mobile devices.

#### --answer--

It is helpful for users to quickly understand the table's purpose and content.

### --question--

#### --text--

What is the difference between the attributes `aria-label` and `aria-labelledby`?

#### --distractors--

The `aria-label` and `aria-labelledby` attributes serve the same purpose.

---

The `aria-label` attribute is used to give a color to its label while the `aria-labelledby` attribute is used to give height to its label.

---

The `aria-label` and `aria-labelledby` attributes keep labels undefined.

#### --answer--

The `aria-labelledby` attribute allows you to give an element an accessible name by referencing an existing element on the page while the `aria-label` attribute allows you to define the name in the attribute itself.

### --question--

#### --text--

Which of the following attributes provides additional information about an element to screen reader users by referencing existing content on the page?

#### --distractors--

`aria-described`

---

`aria-set`

---

`aria-sets`

#### --answer--

`aria-describedby`

### --question--

#### --text--

Which of the following attributes is used to define a keyboard shortcut for an element?

#### --distractors--

`provideaccesskey`

---

`tabindexkey`

---

`accessingkey`

#### --answer--

`accesskey`

### --question--

#### --text--

Which of the following examples is the correct way to associate a `label` with an `input` element?

#### --distractors--

```html
<form>
  <label accessible="name">Your Name</label>
  <input type="text" id="name" />
</form>
```

---

```html
<form>
  <label for="name">Your Name</label>
  <input type="text" id="first-name" />
</form>
```

---

```html
<form>
  <label associate="name">Your Name</label>
  <input type="text" id="name" />
</form>
```

#### --answer--

```html
<form>
  <label for="name">Your Name</label>
  <input type="text" id="name" />
</form>
```

### --question--

#### --text--

How does a screen magnifier help visually-impaired users navigate web pages?

#### --distractors--

A screen magnifier will enlarge only images to twice their size so they can be better viewed by visually-impaired users.

---

A screen magnifier converts text to Braille for tactile reading.

---

A screen magnifier automatically adjusts the color contrast of web pages.

#### --answer--

A screen magnifier helps visually-impaired users navigate web pages by allowing them to zoom in and out.

### --question--

#### --text--

Which of the following is the correct use of `aria-describedby` to provide more context about a button's action?

#### --distractors--

```html
<button id="delete-message" aria-describedby="delete-message">Delete</button>

<p aria-describedby="delete-message" id="delete-message">Warning! All deletions are permanent.</p>
```

---

```html
<button id="delete-btn" aria-describedby="delete-btn">Delete</button>

<p aria-describedby="delete-message" id="delete-message">Warning! All deletions are permanent.</p>
```

---

```html
<button id="delete-message">Delete</button>

<p aria-describedby="delete-message">Warning! All deletions are permanent.</p>
```

#### --answer--

```html
<button aria-describedby="delete-message">Delete</button>

<p id="delete-message">Warning! All deletions are permanent.</p>
```

### --question--

#### --text--

What is the difference between WCAG and WAI-ARIA?

#### --distractors--

WCAG provides general guidelines for mobile only accessibility, while WAI-ARIA offers specific rules for making dynamic and interactive content accessible for users of assistive technologies.

---

WAI-ARIA provides general guidelines for mobile only accessibility, while WCAG offers specific rules for making dynamic and interactive content accessible for users of assistive technologies.

---

WAI-ARIA provides general guidelines for web accessibility, while WCAG offers specific rules for making dynamic and interactive content accessible for users of assistive technologies.

#### --answer--

WCAG provides general guidelines for web accessibility, while WAI-ARIA offers specific rules for making dynamic and interactive content accessible for users of assistive technologies.

### --question--

#### --text--

Which of the following is a common use case for using the `aria-hidden` attribute?

#### --distractors--

Forms and tables that don't contain important information.

---

Paragraphs and headings that don't contain important information.

---

Links and images that only have a decorative purpose.

#### --answer--

Icons and images that only have a decorative purpose.

### --question--

#### --text--

What is the purpose of the `role` attribute?

#### --distractors--

To style elements with CSS animations allowing assistive technologies to better understand how the element should be interpreted and interacted with.

---

To define the visual appearance of HTML elements allowing assistive technologies to better understand how the element should be interpreted and interacted with.

---

To add labels to form elements allowing assistive technologies to better understand how the element should be interpreted and interacted with.

#### --answer--

To specify the type and purpose of an element, allowing assistive technologies to better understand how the element should be interpreted and interacted with.

### --question--

#### --text--

Why is it important to use descriptive link text for links?

#### --distractors--

To make the link text stand out visually from the rest of the page content.

---

To ensure the link loads faster when clicked.

---

To ensure that search engines will always list your site as the first result in the list.

#### --answer--

To ensure that everyone, including users of assistive technology understand the purpose of the link.

### --question--

#### --text--

Which of the following is a best practice for making audio and video content accessible?

#### --distractors--

Providing high-quality graphics to accompany the audio and video content to make it accessible to people with visual impairments.

---

Using bright colors and large text to make the content more engaging and to make it accessible to people with visual impairments.

---

Limiting the length of audio and video content to make it accessible to people with hearing impairments.

#### --answer--

Providing captions and transcripts for audio and video content to make it accessible to people with hearing impairments.

### --question--

#### --text--

What are the four principles behind the Web Content Accessibility Guidelines?

#### --distractors--

Perceivable, Operable, Units, and Robust.

---

Perceivable, Operations, Understandable, and Robust.

---

Persistent, Operable, Understandable, and Robust.

#### --answer--

Perceivable, Operable, Understandable, and Robust.

---

## review-html

### HTML Review


---

# COMPUTERS

## computer-basics

### What Are the Basic Parts of a Computer?
Computers are very powerful machines that perform a variety of tasks like writing documents, playing games, and browsing the internet.

As a developer, it is important to understand the basic inner workings of a computer.

The first major component of a computer would be the motherboard. The motherboard holds all the memory and connectors that are needed to run the computer. It serves as the main circuit board for the computer.

Inside the computer case of the motherboard, you will find the CPU which stands for Central Processing Unit. The CPU is a processor that is responsible for executing instructions and performing calculations. It is often referred to as the brain of the computer.

The CPU is a small square with a chip that goes into the motherboard's CPU socket. The CPU processor speed is measured in gigahertz (GHz) and mega-hertz (MHz). Gigahertz is a billion cycles per second and mega-hertz is a million cycles per second.

The next critical component of a computer would be the system's short term memory. This is known as RAM or Random Access Memory. RAM is a temporary storage location for the computer's CPU. Anytime the computer needs to access data quickly, it will use RAM.

The more RAM you have on your computer, the faster it will run and the more programs you can run at the same time. If you are running low on RAM, your computer will run slower and you will notice the difference in performance.

It is important to note that RAM is volatile memory. This means that it is lost when the computer is turned off. This is why it is important to save your work on your computer.

When you do save your files, they are stored on the hard drive. The hard disk drive, or HDD, is a permanent storage location that is used to store data even when the computer is turned off. This is where all your files and software are stored.

The hard drive is made up of a spinning platter and an arm. The platter is where the data is stored and the arm is used to read and write data to the platter. When you have a faster hard drive, your computer will boot up faster and your programs will run faster.

Another type of data storage would be the Solid State Drive, or SSD for short. SSD is non volatile flash memory and can be used in place of a hard drive. SSDs are faster and smaller than hard drives but hard drives are cheaper and have more storage capacity.

Another key component of a computer is the power supply unit, or PSU. The PSU is responsible for converting the electricity from the wall outlet into a form that the computer can use. It sends the power from the outlet to the motherboard, CPU, and other components of the computer.

Another key component would be the expansion cards. These cards are inserted into the motherboard to add additional functionality to the computer. Examples of expansion cards would be the video card, sound card, and network card.

The video card, also known as the Graphics Processing Unit or GPU, is responsible for rendering visuals on the computer screen.

The sound card is responsible for playing sound on the computer speakers.

The network card is responsible for connecting the computer to the internet.

Even though there are many more parts to the computer, these are some basic parts that you should familiarize yourself with now.

# --questions--

## --text--

What is RAM?

## --answers--

Long term memory.

### --feedback--

Think about short term data storage.

---

Short term memory.

---

The main circuit board.

### --feedback--

Think about short term data storage.

---

A video card.

### --feedback--

Think about short term data storage.

## --video-solution--

2

## --text--

What does CPU stand for?

## --answers--

Centered Protocol Unit.

### --feedback--

Review the beginning of the lesson where this was discussed.

---

City Processing Unit.

### --feedback--

Review the beginning of the lesson where this was discussed.

---

Central Processing Unit.

---

Central Pixel Unit.

### --feedback--

Review the beginning of the lesson where this was discussed.

## --video-solution--

3

## --text--

What is the network card responsible for?

## --answers--

Rendering visuals on the computer screen.

### --feedback--

Review the end of the lesson for the answer.

---

Playing sound on the computer speakers.

### --feedback--

Review the end of the lesson for the answer.

---

Connecting the computer to the internet.

---

Storing short term memory.

### --feedback--

Review the end of the lesson for the answer

## --video-solution--

3

---

### How Can You Effectively Work With Your Keyboard, Mouse, and Other Pointing Devices?
Many of you have been used to working with your keyboard and mouse for years on end for a variety of activities like gaming, performing tasks for work, or surfing the web.

But prolonged misuse of these devices can lead to serious health problems down the road.

In this lesson, we will cover ways to work with your computer’s keyboard and mouse in healthy ways.

The first tip is to be mindful of the mouse grip. When working on serious tasks for work or during intense gaming moments, you may tend to grip the mouse too hard. However, this can lead to serious hand and wrist issues. To prevent this, you want to make sure to hold the mouse gently and keep your fingers nice and relaxed.

The second tip is to consider using an ergonomic keyboard and mouse. These tools are designed to reduce wrist strain by keeping your hands in a more natural position.

While prices for these devices can vary and may be a costly purchase for your current budget, they can be a good investment in your overall long-term health. So, you might consider starting to research an ergonomic keyboard and mouse to use.

Another tip is to keep your mouse the same height as your keyboard. You don't want to have to reach up or down to use the mouse, as this can strain your wrist and arm muscles over time.

You also want to be mindful of your overall posture when sitting at the computer for long periods. Being slouched over your computer and putting your wrists in an unnatural position at the keyboard can lead to long-term health issues.

While maintaining good posture is important, modern ergonomics emphasizes the importance of movement and dynamic sitting. The human body is designed for movement, and staying in any fixed position, even a straight one, for too long can place continuous pressure on the spine. Taking regular breaks, adjusting your position throughout the day, and maintaining a natural wrist position can help improve circulation, reduce fatigue, and support long-term spinal health.

The last tip would be to use keyboard shortcuts whenever possible to help minimize typing. There are dozens of shortcuts available for tasks such as navigating the web, navigating around your operating system, working within a code editor, and more. So, it’s best to research some of these keyboard shortcuts and start incorporating them into your daily computer usage.

As you continue using your mouse and keyboard for upcoming coding projects and other activities, remember to keep these health tips in mind.

# --questions--

## --text--

What is one of the risks of gripping the mouse too tightly?

## --answers--

It can improve your accuracy in gaming.

### --feedback--

Pay attention to the advice about mouse grip at the beginning of the lesson.

---

It helps you complete tasks faster.

### --feedback--

Pay attention to the advice about mouse grip at the beginning of the lesson.

---

It can cause hand and wrist issues.

---

It improves your overall performance.

### --feedback--

Pay attention to the advice about mouse grip at the beginning of the lesson.

## --video-solution--

3

## --text--

What is the benefit of using an ergonomic keyboard and mouse?

## --answers--

They help you type faster.

### --feedback--

The second tip in the lesson mentions ergonomic devices as a way to protect your hands and wrists.

---

They are designed for gaming performance.

### --feedback--

The second tip in the lesson mentions ergonomic devices as a way to protect your hands and wrists.

---

They reduce wrist strain by keeping your hands in a more natural position.

---

They increase screen resolution.

### --feedback--

The second tip in the lesson mentions ergonomic devices as a way to protect your hands and wrists.

## --video-solution--

3

## --text--

What is the recommendation for the height of your mouse in relation to your keyboard?

## --answers--

The mouse should be far above the keyboard.

### --feedback--

Think about how to position your mouse to avoid wrist and arm strain.

---

The mouse should be at the same height as the keyboard.

---

The mouse should be lower than the keyboard.

### --feedback--

Think about how to position your mouse to avoid wrist and arm strain.

---

The mouse should be higher than the keyboard.

### --feedback--

Think about how to position your mouse to avoid wrist and arm strain.

## --video-solution--

2

---

### What Are the Different Types of Internet Service Providers?
First, what is an internet service provider, or ISP? It’s a company that sells access to the global internet network, essentially. And they come in three different tiers.

The first tier are the giant conglomerate companies, which have the infrastructure to handle most (if not all) of their network traffic independently.

The second tier are the country-wide providers, which sometimes rent access to tier 1 networks but can stand fairly well on their own.

The third tier are the small companies that primarily focus on providing internet to local markets, and rely on larger ISPs to provide their infrastructure.

These providers will offer different types of connections as well.

Fibre optic connections rely on glass or plastic fibres to transmit data via light, resulting in very high connection speeds and data exchange.

Cable connections use the same infrastructure as a cable television provider, which often makes them readily available in many regions.

DSL connections use the infrastructure that landline phone services use. Because of the prevalence of this infrastructure, DSL is available in areas where cable might not be. But it is also frequently a slower option.

Dial-up also uses the phone lines, but requires exclusive connection (disabling the use of the line for phone purposes when connected to the internet). This is a much older technology that has fallen into disuse.

Satellite connections use an array of satellites orbiting the earth to connect various devices across the world. And finally, similar to that, a 5G home internet provider uses the cell tower infrastructure to keep you online.

And that should give you a basic rundown of what types of internet service providers and internet connections are out there!

# --questions--

## --text--

Which of the following is NOT a tier of Internet Service Provider (ISP)?

## --answers--

Giant conglomerate companies with independent infrastructure.

### --feedback--

Oversight organizations may regulate ISPs, but are rarely ISPs themselves.

---

Country-wide providers that may rent access to larger networks.

### --feedback--

Oversight organizations may regulate ISPs, but are rarely ISPs themselves.

---

Small companies focusing on local markets.

### --feedback--

Oversight organizations may regulate ISPs, but are rarely ISPs themselves.

---

International organizations overseeing global internet access.

## --video-solution--

4

## --text--

Which type of internet connection uses glass or plastic fibres to transmit data via light?

## --answers--

Cable connection.

### --feedback--

This connection type is known for its very high speeds due to its unique transmission method.

---

DSL connection.

### --feedback--

This connection type is known for its very high speeds due to its unique transmission method.

---

Fibre optic connection.

---

Satellite connection.

### --feedback--

This connection type is known for its very high speeds due to its unique transmission method.

## --video-solution--

3

## --text--

What is a characteristic of dial-up internet connections?

## --answers--

They use the same infrastructure as cable television.

### --feedback--

The last part of the lesson mentions that this older technology disables the use of the phone line for other purposes when connected to the internet.

---

They require exclusive use of the phone line when connected.

---

They use an array of satellites orbiting the earth.

### --feedback--

The last part of the lesson mentions that this older technology disables the use of the phone line for other purposes when connected to the internet.

---

They are the fastest type of internet connection available.

### --feedback--

The last part of the lesson mentions that this older technology disables the use of the phone line for other purposes when connected to the internet.

## --video-solution--

2

---

### What Are Safe Ways to Sign Into Your Computer?
Many of you have been using computers for a while. But you might not have thought about the safest or most secure ways to sign into your computer.

Whether you are using a Mac or PC, there are many ways to safely sign into your computer.

The first thing you should do is to make sure that your computer is password protected.

For Windows users, start by opening the Start menu and selecting Settings. From there, go to Accounts and then Sign-in options. You can then set up a password for your computer.

*Note: If you encounter any difficulties or are using a different version of Windows, refer to the official Microsoft documentation or support resources for detailed instructions tailored to your specific version.*

When creating your password, make sure it is a long and complex password. You can use a combination of letters, numbers and special characters to make it more secure.

Choosing an easy password like `12345` or `password` is not a good idea. These are easy to guess and can be easily hacked.

Also, do not use passwords based on personal information like your name, birthday, or address. Those are also easy for hackers to guess.

When you create your password, it is also a good idea to setup two-factor authentication (2FA). 2FA serves as an extra layer of security and requires a second form of verification to ensure that the person trying to access the account is indeed the authorized user.

If you are a Mac user, you can click on the Apple menu and then go to system settings. From there you can go to Users & Groups and set up a password for your computer.

Some Mac computers come with a touch ID feature, which is often considered more secure than regular passwords. This feature allows you to sign into your computer using your fingerprint.

For Windows users, the Windows Hello feature offers a more secure way to sign in. It uses biometric methods such as facial recognition or fingerprints for authentication, providing an alternative to traditional passwords.

After you finish this lesson, I urge you to look into these additional security features and set them up on your computer so that you can keep your computer safe and secure.

# --questions--

## --text--

Which of the following is considered an unsafe password?

## --answers--

`@dlkj(2***1`

### --feedback--

The more complex the password, the more secure it is.

---

`12345`

---

`#sj1--`

### --feedback--

The more complex the password, the more secure it is.

---

`7!9@2`

### --feedback--

The more complex the password, the more secure it is.

## --video-solution--

2

## --text--

Why is two-factor authentication (2FA) important?

## --answers--

It stores your passwords securely.

### --feedback--

Think about the extra layer of security.

---

It automatically fixes broken passwords.

### --feedback--

Think about the extra layer of security.

---

It guarantees that your accounts can't be hacked.

### --feedback--

Think about the extra layer of security.

---

It ensures the person trying to access the account is the authorized user.

## --video-solution--

4

## --text--

What are features like Touch ID and Windows Hello used for?

## --answers--

To automatically generate passwords for you.

### --feedback--

Think about the different types of authentication and recognition used here.

---

To store your passwords securely.

### --feedback--

Think about the different types of authentication and recognition used here.

---

To sign into your computer using your fingerprint or facial recognition.

---

To guarantee that your accounts can't be hacked.

### --feedback--

Think about the different types of authentication and recognition used here.

## --video-solution--

3

---

### What Are the Different Types of Tools Professional Developers Use?
Professional developers rely on a variety of tools to increase productivity and code quality. Let's learn about those tools, including the ones that seem very obvious.

The first among the tools is computers. A computer is the primary development environment. It could be a heavy desktop or a portable laptop with either Windows, macOS, or Linux as the operating system.

Professional developers often go for computers with fast processing power and plenty of RAM to handle resource-intensive tasks.

After the computer is a program for writing and editing code right on that computer. That's a code editor or integrated development environment (IDE).

IDEs like Visual Studio, IntelliJ IDEA, JetBrains, and PyCharm provide powerful features like code completion, debugging, and integrated terminal support.

Visual Studio Code (VS Code) is essentially a code editor, but it also provides these functionalities with its rich extension library.

Other code editors are Sublime Text, Atom, Notepad++, and Brackets.

When you write code with code editors and IDEs, you need to track the changes you make to them. The tool that lets you track those changes is a version control system.

Git is the most widely used version control system in the development community.

Platforms like GitHub, GitLab, and Bitbucket provide cloud-based hosting services for your Git repositories. These platforms enable collaboration with other developers, allow you to work on multiple branches, and facilitate the merging of code changes.

Package managers are another critical tool. They help developers simplify the process of adding, updating, and removing libraries and project dependencies.

Examples of popular package managers are:

* NPM, Yarn, and PNPM for JavaScript
* PIP for Python
* Composer for PHP
* Maven for Java

After writing code with different tools, developers test that code to make sure it's working as expected.

For this, developers use testing frameworks like Cypress, Playwright, Selenium, and others. There are also language-specific testing frameworks. Examples are:

* Jest for JavaScript
* pytest for Python
* JUnit for Java
* PHPUnit for PHP

You don't only need to test the code to make sure it's working as expected. You also need to test what the code looks like visually to the end users. Developers use web browsers for this.

Modern browsers like Chrome, Firefox, Edge, and Safari offer developer tools for inspecting HTML, CSS, and JavaScript code. There are also tools for debugging and performance profiling.

These tools help developers test and optimize their web applications across different browsers for the end users.

# --questions--

## --text--

Why do developers go for computers with fast processing power?

## --answers--

To watch the computer do all the work for them.

### --feedback--

Think about what enhances performance for demanding development tasks.

---

To handle resource-intensive tasks.

---

To play high-end games.

### --feedback--

Think about what enhances performance for demanding development tasks.

---

To watch movies without a glitch.

### --feedback--

Think about what enhances performance for demanding development tasks.

## --video-solution--

2

## --text--

What provides code completion, debugging, and integrated terminal for developers?

## --answers--

Code editors and IDEs.

---

Testing frameworks.

### --feedback--

Look out for the tools that offer a comprehensive development environment.

---

Package managers.

### --feedback--

Look out for the tools that offer a comprehensive development environment.

---

Git.

### --feedback--

Look out for the tools that offer a comprehensive development environment.

## --video-solution--

1

## --text--

Which tools help developers test their code to ensure it works as intended?

## --answers--

Code editors and IDEs.

### --feedback--

Think about tools that run automated checks on the code.

---

Operating systems.

### --feedback--

Think about tools that run automated checks on the code.

---

Version control systems

### --feedback--

Think about tools that run automated checks on the code.

---

Testing frameworks.

## --video-solution--

4

---

### How Can You Use File Management Applications on Your Computer?
A file management application is a way to easily store, organize, and edit your files on your computer. Whether you use a Mac or Windows computer, there are built-in applications you can use to organize your files.

If you have a Windows computer, the default file manager is the File Explorer. This is used to browse, search, and manage files and folders, as well as perform file operations like copying, moving, and deleting.

To find the File Explorer, you can go to the Start menu or press the Windows logo key on your keyboard.

To pin a folder, you can right click with your mouse and select "Pin". To move a file or folder, you first need to select it, then select "Cut" and then navigate to the new location to paste it.

If you have a Mac computer, the default file manager is the Finder. This provides access to local and remote files, supports file previews, and offers a variety of organizational features like tags and Smart Folders.

To access the Finder on your Mac, go to the Dock at the bottom and click on the Finder icon.

You will notice a sidebar on the left-hand side where your favorite folders are located.

One way to organize your files, is to use tags. To tag a file or folder, you can select the item in the Finder and then right click with your mouse. You will see the "Tags..." option in the dropdown and you can apply a custom colored tag.

To search for tagged items, you can scroll to the bottom of the sidebar and click on the corresponding colored tag, or you can search for the tag by color name in the search field.

Another way to organize your files is to use smart folders. Smart folders are collections of files that are automatically organized based on criteria you set, such as file type, date, or keywords.

Whether you're using File Explorer on Windows or Finder on Mac, these applications provide flexibility to manage your files with features like tags, search, and Smart Folders.

# --questions--

## --text--

What is the default file management application on a Windows computer?

## --answers--

Finder

### --feedback--

It's the application used to browse, search, and manage files on Windows.

---

Smart Folders

### --feedback--

It's the application used to browse, search, and manage files on Windows.

---

File Explorer

---

Spotlight

### --feedback--

It's the application used to browse, search, and manage files on Windows.

## --video-solution--

3

## --text--

How can you pin a folder in File Explorer on a Windows computer?

## --answers--

Right-click the folder and select "Pin to Start".

---

Press "Ctrl + Pin".

### --feedback--

You'll right-click the folder and select an option to keep it handy.

---

There is no option to pin a folder.

### --feedback--

You'll right-click the folder and select an option to keep it handy.

---

Drag the folder to the taskbar.

### --feedback--

You'll right-click the folder and select an option to keep it handy.

## --video-solution--

1

## --text--

On a Mac, how do you access the Finder?

## --answers--

Click on the Finder icon in the Dock.

---

Press "Command + Find".

### --feedback--

It's an icon located at the bottom of the screen, in the Dock.

---

Go to the Start menu.

### --feedback--

It's an icon located at the bottom of the screen, in the Dock.

---

Open the Spotlight search.

### --feedback--

It's an icon located at the bottom of the screen, in the Dock.

## --video-solution--

1

---

### What Are Best Practices for Naming Files for Web Applications?
As you start to build out your own web applications, you will need to be mindful of what you name your files.

You will want to name your files in a way that is easy to understand and maintain.

Let's take a look at some examples of good and bad file names for HTML files. Note that the `.html` extension in these examples tells us that this is an HTML file.

Here is an example of a bad file name: 

```md
index1234.html
```

By the name alone, it is not clear what the file is about. This file could be for a products page, blog page, or any other type of page but we don't know that from the file name.

Here is an example of a better file name for an HTML file:

```md
about-us.html
```

By using a more descriptive name like `about-us.html`, it is clear what the file is about.

You will also notice in this file name that there are no spaces. Instead, you use a hyphen, `-`, to separate the words. 

Sometimes you might see a file name called `index.html`. This is a special file name that is used to represent the main page of a website. When you visit a website, the `index.html` file is the first file that is loaded.

Another important consideration when naming files is the use of special characters.

Using a mixture of special characters, numbers, and letters can make it difficult to understand what the file is about.

Here is an example of a bad file name:

```md
file-1!@.html
```

This name looks unnecessarily complicated and does not give us any information about what the file is about.

So it is best to stick with only using letters and dashes in your file names.

As you start to learn more languages, you will see that there are common conventions for naming files in those languages as well. 

In these situations, it is always best to consult with official documentation or other resources to understand the best practices for naming files in that language.

Also you will be in situations where you are working on a team and you will need to follow the conventions that the team has established for naming files. 

Always consult with the team's style guide to make sure your file names are consistent with the rest of the team.

# --questions--

## --text--

Which of the following is a bad example for naming an HTML file?

## --answers--

`index.html`

### --feedback--

Think about the file name that looks complicated.

---

`about-us.html`

### --feedback--

Think about the file name that looks complicated.

---

`file-1!@.html`

---

`products.html`

### --feedback--

Think about the file name that looks complicated.

## --video-solution--

3

## --text--

What does the `index.html` file represent?

## --answers--

The main page of a website.

---

A database file used to store user information.

### --feedback--

Think about the main content of a website.

---

A configuration file for server settings.

### --feedback--

Think about the main content of a website.

---

A script file for running server-side code.

### --feedback--

Think about the main content of a website.

## --video-solution--

1

## --text--

Why are special characters not recommended for file names?

## --answers--

They make files incompatible with all operating systems.

### --feedback--

Think about the purpose of file names.

---

They make it difficult to understand what the file is about.

---

They lead to frequent software crashes.

### --feedback--

Think about the purpose of file names.

---

They make it impossible to transfer files between computers.

### --feedback--

Think about the purpose of file names.

## --video-solution--

2

---

### What Are Best Practices for File/Folder Organization in Web Applications?
When building out web applications, it is important to think about the organization of your files and folders. This will help keep your code organized and easier to maintain.

Let's take a look at an example folder structure for an HTML and CSS project:

```bash
.
├── /assets
│   ├── /images
│   │   ├── logo.png
│   │   ├── banner.jpg
│   │   └── icons.svg
│   ├── /fonts
│   │   ├── custom-font.woff
│   │   └── custom-font.woff2
├── /css
│   ├── main.css
│   ├── about.css
│   └── contact.css
├── index.html
├── about.html
├── contact.html
└── README.md
```

At the top of the example, there is a single dot, which represents the root directory.

The root directory is the top-level directory in a file system, serving as the starting point for all file paths and containing all other directories and files. A directory is another name for a folder.

Inside the root directory, the first directory shown is the `assets` directory. The term `assets` refers to any files that are used in the project, such as images, fonts, or other resources.

In this example, there are two directories inside the `assets` directory called `images` and `fonts`.

The next directory would be the `css` directory. Sometimes this is also referred to as a stylesheets directory. This is where you would store all of your CSS files.

Below the `css` directory are the HTML files. The `index.html` file represents the homepage, while `about.html` and `contact.html` represent the About and Contact pages, respectively.

Lastly, there is a `README.md` file. `README` files are commonly used to provide useful information about the project, such as what it does, how to use it, and any other relevant details.

The `.md` extension stands for Markdown, which is a lightweight markup language that is often used to write documentation.

By organizing your project into assets, CSS, and HTML files, it makes it easy to find what you are looking for. This also makes it easy for other developers to contribute to your project.

It is important to note that this is just one example of how you can organize your files and folders. There are many different ways to structure a project.

# --questions--

## --text--

What is the assets directory used for in a web application?

## --answers--

It's used to store server log files are kept to monitor web application performance.

### --feedback--

Think about where to store files like images and fonts in a project.

---

It's used to store files such as images, fonts, and other resources.

---

It's used to store scripts and tools for testing the web application.

### --feedback--

Think about where to store files like images and fonts in a project.

---

It's used to hold third-party libraries and frameworks.

### --feedback--

Think about where to store files like images and fonts in a project.

## --video-solution--

2

## --text--

What is a `README.md` file commonly used for in a project?

## --answers--

It's used to store personal information and data collected from users.

### --feedback--

Think about the file that is used to describe the project.

---

It's used to define the structure and schema of the project's database.

### --feedback--

Think about the file that is used to describe the project.

---

It's used to provide useful information about the project.

---

It's used to track and document issues and bugs found in the project.

### --feedback--

Think about the file that is used to describe the project.

## --video-solution--

3

## --text--

What does the root directory represent in a file system?

## --answers--

It represents the default folder where downloaded files are saved.

### --feedback--

Think about the top level directory in a file system.

---

It holds cached files and data to speed up system operations.

### --feedback--

Think about the top level directory in a file system.

---

It contains logs and diagnostic information about system performance.

### --feedback--

Think about the top level directory in a file system.

---

The starting point for all file paths and contains all other directories and files within it.

## --video-solution--

4

---

### How Can You Create, Move, and Delete Files and Folders Using Explorer/Finder?
To create a file on Windows using the Explorer, you can click on the "New" option at the top left. This will show you a list of the different types of files that you can create. 

You can also create files in their corresponding applications. Let's create a text file to show you the process.

When you click on "New" and select the file type, you will see a new text file in your current folder with a default name. You can rename it if you'd like.

The process of creating folders is exactly the same. Click the "New" button at the top left and then select the "Folder" option or right-click on an empty spot and go to "New." Then, select the "Folder" option. You'll see a new empty folder in your current location.

You can rename files and folders by selecting them and clicking on the "Rename" option at the top. When current name of the file is highlighted, you can start writing the new name of the file. Press Enter to confirm the changes.

Alternatively, you can right-click on the file or folder and select the "Rename" option or use the F2 keyboard shortcut. Write the new name and press Enter to confirm the changes. 

You can move a file or folder to another folder by dragging and dropping it into the destination folder, if you have it opened it as a tab. 

You can also select the file or folder and select the "Cut" option at the top.

Then, go to the destination folder and paste it by clicking the "Paste" button at the top. If you copied or cut the file previously, this button will be enabled.

You can also do this by right-clicking on an empty spot and then clicking on the paste icon. This will remove the file or folder from its original location.

To delete a file or folder, click on it and then click on the Trash icon at the top. You will also find a "Delete" option if you right-click on it.

Great. Now let's see how you can do this on macOS using Finder. 

Finder is the default file manager on macOS.

To create a file on macOS, you need to open an application that lets you create the type of document that you need to create. Currently, there isn't a built-in way to create a file directly on Finder.

For example, to create a simple plain text file, you can open TextEdit and save your file. The process works exactly the same for any type of file.

There are many ways to open TextEdit. One of them is to go to Launchpad. Then, search for an app where you can create the type of file that you're interested in. In this case, that would be "TextEdit." Click on the icon to open the app.

Once you are inside the app, you should see an option to save your file in the File menu. This menu is located at the top left, next to the Apple menu icon.

In one of the App menu options, you should see a command to save the file. This is usually under the File menu.

Next to it, you will see the keyboard shortcut for saving your file. This is usually `Command + S` on macOS.

When you are saving the file for the first time, you should see a dialog window, where you can write the name of the file and choose a location.

Usually, the file extension is added by the application automatically but you can change it before saving the file.

After saving the file, you can open Finder by clicking on the Finder icon in the Dock. You should see your new file in the folder where you saved it.

To create a new folder, you should go to the location where you want to create that new folder and right-click on an empty spot. You will see a list of options. The first option is "New Folder."

If you click on it, you can assign a name to your new folder. Write the name and press Enter to confirm.

There are multiple ways to move files and folders in Finder. If you need to move them to a folder listed in your Finder "Favorites" section, you can just drag and drop it.

If you need to move it to a different folder, you have two options. 

You can either open the destination folder as a tab and drag and drop the file or folder into the tab.

Or you can use keyboard shortcuts. First, copy the file with `Command + C`, go to the new folder, and then use `Command + Option + V` to paste the file or folder in that location. This will also remove it from the original folder.

To delete a file or folder, you can right-click on it and select "Move to trash."

You can also drag and drop them into the trash icon on the Dock. This is equivalent.

When the file or folder is in the trash can, you can right-click on it to delete it immediately or you can empty the trash to remove all the deleted files and folders permanently.

Knowing how to create, move, and delete files and folders on Windows and macOS is very important. By mastering these skills, you can organize your files, locate them quickly, and free up storage on your computer by deleting unnecessary files.

# --questions--

## --text--

Which of these actions permanently removes a file or folder from your computer?

## --answers--

Moving the file to a different folder.

### --feedback--

Think about where files go after you delete them.

---

Renaming the file or folder.

### --feedback--

Think about where files go after you delete them.

---

Emptying the Recycle Bin or Trash.

---

Copying the file or folder to an external drive.

### --feedback--

Think about where files go after you delete them.

## --video-solution--

3

## --text--

What is the primary difference between copying and moving a file?

## --answers--

Copying creates a duplicate of the file, while moving transfers the original file to a new location.

---

Moving creates a duplicate of the file in a new location, while copying transfers the original file.

### --feedback--

Think about the impact of copying versus moving the original file.

---

There is no difference between copying and moving a file.

### --feedback--

Think about the impact of copying versus moving the original file.

---

Copying deletes the original file, while moving creates a new file.

### --feedback--

Think about the impact of copying versus moving the original file.

## --video-solution--

1

## --text--

Why are folders important for organizing your computer?

## --answers--

Folders make files more difficult to find.

### --feedback--

Think about why grouping your files can be helpful.

---

Folders are only necessary for storing large files.

### --feedback--

Think about why grouping your files can be helpful.

---

Folders help you categorize and find files efficiently.

---

Folders slow down your computer if you have too many.

### --feedback--

Think about why grouping your files can be helpful.

## --video-solution--

3

---

### How Can You Search for Files and Folders on Your Computer?
Let's learn how to search for files and folders on Windows and macOS.

We'll start with Windows. You can search from the Taskbar or from the File Explorer.

To search from the Taskbar, write the name of the file or folder that you are looking for. You can also search for keywords. You'll see results from across your PC and OneDrive.

If you only want to see documents, you can click on the "Documents" tab. You also have tabs for apps and web results.

Another alternative is to use the Search File Explorer. You will find it at the top right of the Explorer window, where you can see "Search Documents."

You have three options to define the scope of the search:

- You can search from Home to find files from your PC and from the cloud quickly.

- You can search from a folder to find files stored inside it.

- You can search from This PC for a slow but in-depth search.

This is how you can search for files and folders on Windows. Now let's see how you can do this on macOS.

First, you can use Spotlight, a tool that helps you find files on your Mac. To open Spotlight, go to your menu bar at the top right and find the magnifying glass icon. If you don't see this icon on the menu bar, you can add it in the Control Center settings.

Go to your settings, filter by "Control Center", click on this option and then scroll down until you find the "Spotlight" option. You can also use a keyboard shortcut to open Spotlight: `Command + Spacebar`.

When you open Spotlight, you'll see the Spotlight Search, where you can search for any file or folder by typing its name. When you start typing, you'll see the results grouped by category, including suggestions, folders, presentations, photos, documents, and related searches.

You can also expand a specific category by clicking on "Show More."

Another way to search for files that you have recently opened is to open Finder by clicking on the Finder icon in the Dock. Then, go to "Recents" in the Finder sidebar. And there, you'll find all the files that you've recently viewed.

This is how you can search for files and folders on macOS. With these search tools, you can optimize your workflow and find the files and folders you need very quickly.

# --questions--

## --text--

If you need to perform a quick search on your Windows PC and cloud files, you should start your search from:

## --answers--

Home

---

A specific folder

### --feedback--

Think about the speed of the search process. Which one is the fastest one?

---

This PC

### --feedback--

Think about the speed of the search process. Which one is the fastest one?

---

Desktop

### --feedback--

Think about the speed of the search process. Which one is the fastest one?

## --video-solution--

1

## --text--

What is the name of a powerful search tool built into macOS that helps you find files and folder in your entire system quickly?

## --answers--

Explorer

### --feedback--

Think about the search tools available on macOS.

---

Control Center

### --feedback--

Think about the search tools available on macOS.

---

Sidebar

### --feedback--

Think about the search tools available on macOS.

---

Spotlight

## --video-solution--

4

## --text--

What is the name of the horizontal bar, typically located at the bottom of a Windows computer screen, where you can search for files and folder?

## --answers--

Sidebar

### --feedback--

Think about the search tools available on Windows.

---

Taskbar

---

Spotlight

### --feedback--

Think about the search tools available on Windows.

---

Finder

### --feedback--

Think about the search tools available on Windows.

## --video-solution--

2

---

### What Are Some Common File Types You Will Work With in Web Applications?
Files are classified based on their content and structure. The file type determines how a file is opened and processed by computer programs.

We identify file types based on their extensions. A file extension is a three or four letter suffix at the end of the file name. The three main file types that you will find in web applications are HTML, CSS, and JavaScript.

HTML files contain the structure and content of the web application. They have a `.html` file extension.

CSS files define the styles. They have a `.css` file extension.

And JavaScript files add more advanced functionality and interactivity. They have a `.js` file extension.

As you develop web applications, you will also need to include images. These are some of the most widely used image file types.

JPEG, which stands for "Joint Photographic Experts Group," is known for its efficient compression. It's great for photographs and images. However, the compression is lossy, which means that some image quality is lost to reduce the file size.

PNG, which stands for "Portable Network Graphics," preserves image quality, even after compression. This results in larger files. PNG supports transparency and it's great for images with sharp edges, like logos and icons.

The GIF image format supports both animation and transparency but has a limited color palette. GIF stands for "Graphics Interchange Format."

And finally, we have SVG, which stands for "Scalable Vector Graphics." It's a vector image format. These images can be scaled as much as needed without losing quality.

Great. Now that you know about image formats, let's see some video and audio formats.

MP3 is an audio format known for its efficient compression. It's a lossy format, so some audio data is lost during the compression to make these files smaller.

MP4 is one of the most common video formats. It offers good compression and supports multiple audio and video codecs, subtitles, and metadata.

MOV, the QuickTime multimedia file format developed by Apple, is primarily associated with QuickTime Player.

Other popular audio and video file types are WAV, a lossless audio format that keeps the original quality of the audio, and WebM, a high-quality open-source video format.

If you ever need to customize the fonts of your web application, you will also work with font formats. These are three of the most widely used ones.

TTF, which stands for "TrueType Font", is a font format compatible with different operating systems.

WOFF is a modern font format, specifically designed for web development purposes. It stands for "Web Open Font Format". These files are smaller because they have better compression. They can also store metadata, including licensing information.

And WOFF2 is the successor of WOFF with even more efficient compression and performance.

You can also create archive files if you need to group multiple folders and files. The most widely used archive format is ZIP. ZIP offers lossless compression, so no data is lost during the process. It's widely supported across operating systems and software applications.

And finally, let's talk about documentation. In web applications, you will usually find a file called `README` that contains information about the application, like how to use it, how to install it, its license, and how to contribute.

They are usually written in a file format called Markdown. With Markdown, you can create structured documents with headings, subheadings, links, images, lists, and more. Markdown files have a `.md` or `.markdown` extension.

Here you can find the `README` file of freeCodeCamp's GitHub repository: https://github.com/freeCodeCamp/freeCodeCamp/blob/main/README.md

You can create this detailed structure and format using Markdown.

You will definitely read and write many `README` files throughout your career. Learning about these common file types is essential for web development. 

From the core building blocks of HTML, CSS, and JavaScript to image, video, and audio formats, every file type has an important role in creating interactive web applications.

# --questions--

## --text--

Which file format is best suited for images with sharp edges and transparent backgrounds?

## --answers--

`JPEG`

### --feedback--

Think about the image format needed for logos and icons.

---

`PNG`

---

`GIF`

### --feedback--

Think about the image format needed for logos and icons.

---

`SVG`

### --feedback--

Think about the image format needed for logos and icons.

## --video-solution--

2

## --text--

Which one of these options is an audio format known for its lossless compression?

## --answers--

`MP3`

### --feedback--

Think about audio quality and file size. Lossless compression results in larger files.

---

`WAV`

---

`SVG`

### --feedback--

Think about audio quality and file size. Lossless compression results in larger files.

---

`MP4`

### --feedback--

Think about audio quality and file size. Lossless compression results in larger files.

## --video-solution--

2

## --text--

Which one of these options is a modern font format used for web development purposes?

## --answers--

`TTF`

### --feedback--

Think about which font format results in smaller file size and better compression.

---

`WOFF`

---

`GIF`

### --feedback--

Think about which font format results in smaller file size and better compression.

---

`ZIP`

### --feedback--

Think about which font format results in smaller file size and better compression.

## --video-solution--

2

---

### What Are Some of the Common Web Browsers Available Today and How Do You Install One?
Web browsers are applications you use to visit pages on the internet. If you are going through the freeCodeCamp curriculum, there is a very good chance you are using a web browser right now!

As of 2024, the most popular browsers are Microsoft Edge, Firefox, Google Chrome, and Safari. There are quite a few other options, and market shares are always changing, but these four are the most common at this time.

Your operating system most likely comes with a browser installed by default. For Windows, you'd have Microsoft Edge. For macOS, you'd have Safari. For Linux, you'll probably have Firefox.

But what if you want to use a different browser?

The good news is you already have a default browser. So you can navigate to the web page for the browser you want, and download the appropriate installer for your operating system.

When choosing a browser, consider factors like speed, security features, and compatibility with websites you frequently visit.

Some browsers offer unique features. For example, Opera has a built-in VPN, while Brave focuses on privacy and ad-blocking.

Installation is usually straightforward. After downloading the installer, simply run it and follow the on-screen instructions.

Most browsers will offer to import your bookmarks and settings from your current default browser, making the transition easier.

Alternatively, you can install a browser through your operating system's package manager, such as `brew install --cask google-chrome` on macOS with Homebrew, or `yay -S brave-bin` on Arch Linux.

The package manager and package names available to you will vary depending on your operating system.

Remember, you're not limited to just one browser. Many people use different browsers for different purposes, perhaps one for work and another for personal browsing.

Feel free to experiment with different browsers to find what works best for you.

# --questions--

## --text--

Which of the following is NOT one of the most popular web browsers as of 2024?

## --answers--

Microsoft Edge

### --feedback--

Think about which browser was discontinued and replaced by Microsoft Edge.

---

Firefox

### --feedback--

Think about which browser was discontinued and replaced by Microsoft Edge.

---

Google Chrome

### --feedback--

Think about which browser was discontinued and replaced by Microsoft Edge.

---

Internet Explorer

## --video-solution--

4

## --text--

What is the default web browser that typically comes pre-installed on macOS?

## --answers--

Microsoft Edge

### --feedback--

Windows comes with Microsoft Edge, and Linux frequently comes with Firefox.

---

Firefox

### --feedback--

Windows comes with Microsoft Edge, and Linux frequently comes with Firefox.

---

Google Chrome

### --feedback--

Windows comes with Microsoft Edge, and Linux frequently comes with Firefox.

---

Safari

## --video-solution--

4

## --text--

Which of the following is a method for installing a web browser on a computer?

## --answers--

Using the operating system's package manager.

### --feedback--

There are multiple ways to install a browser.

---

Downloading directly from the browser's website.

### --feedback--

There are multiple ways to install a browser.

---

Both A and B.

---

None of the above.

### --feedback--

There are multiple ways to install a browser.

## --video-solution--

3

---

### What Is the Difference Between a Web Browser, a Website, and a Search Engine?
Web browsers are software applications that allow users to access and navigate the World Wide Web. They interpret and display web content, including text, images, videos, and interactive elements.

Key features of web browsers include the address bar, where you enter URLs or search queries, and the rendering engine, which translates HTML, CSS, and JavaScript into visual web pages.

Browsers also offer bookmarks to save and organize favorite websites, extensions to enhance functionality, and various privacy and security features such as pop-up blockers and private browsing modes.

Popular web browsers include Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, and Opera.

Websites, on the other hand, are collections of web pages and related content that are identified by a common domain name and published on at least one web server. They are the destinations you visit using your web browser.

Components of websites include the domain name, which is the unique address of the website (like freecodecamp.org), and web pages, which are individual documents that make up a website.

Websites also often include multimedia content like images, videos, and audio files that enhance the user experience, as well as interactive elements such as forms and buttons that allow user interaction.

Websites can be static, where content rarely changes, or dynamic, where content updates frequently or is personalized for users.

Search engines are web-based tools designed to help users find information on the internet. They use complex algorithms to index and rank web pages based on relevance to user queries.

Key aspects of search engines include web crawlers, also known as spiders or bots, which are programs that systematically browse the web to discover and index new content.

The indexing process involves organizing and storing information about web pages in massive databases.

Search engines also employ ranking algorithms, which are complex systems that determine the order of search results based on factors like relevance, authority, and user experience. Popular search engines include Google, Bing, Yahoo, and DuckDuckGo.

The relationship between browsers, websites, and search engines is interconnected.

Web browsers are the tools used to access both websites and search engines.

Websites are the destinations that users visit through browsers or find via search engines.

Search engines help users discover websites by providing organized access to the vast amount of information on the web.

Understanding these distinctions and relationships is crucial for effective internet use and basic web literacy.

# --questions--

## --text--

What is the primary function of a web browser?

## --answers--

To create websites.

### --feedback--

Think about what you use a web browser for in your daily internet activities.

---

To index web pages.

### --feedback--

Think about what you use a web browser for in your daily internet activities.

---

To access and navigate the World Wide Web.

---

To rank search results.

### --feedback--

Think about what you use a web browser for in your daily internet activities.

## --video-solution--

3

## --text--

Which of the following is NOT a component of a website?

## --answers--

Domain name.

### --feedback--

Consider the elements that make up a website versus those that are part of other web technologies.

---

Web pages.

### --feedback--

Consider the elements that make up a website versus those that are part of other web technologies.

---

Multimedia content.

### --feedback--

Consider the elements that make up a website versus those that are part of other web technologies.

---

Rendering engine.

## --video-solution--

4

## --text--

What is the main purpose of a search engine's web crawler?

## --answers--

To systematically browse and index web content.

---

To display web pages to users.

### --feedback--

Think about how search engines gather information about websites across the internet.

---

To block pop-up advertisements.

### --feedback--

Think about how search engines gather information about websites across the internet.

---

To create domain names for websites.

### --feedback--

Think about how search engines gather information about websites across the internet.

## --video-solution--

1

---

### How to Use a Search Engine Effectively to Achieve Optimal Results
Searching for information on the Internet can be a daunting task. There are so many websites out there, with so much data, that it may seem impossible to get the results you want.

But thanks to things like boolean search syntax, you can narrow down your search to exactly what you need.

Boolean search syntax is a way to use special words to help you find exactly what you're looking for when searching online.

Here is an example of a basic search query for `freecodecamp curriculum`.

When you search for `freecodecamp curriculum`, the search engine will return results that match *any* of these keywords – typically sorted by relevance (how likely they are to match, or be related to, more of your query).

But what if you only wanted results that matched both keywords? Well, you might have heard that you can wrap a query in quotation marks, like `"freecodecamp curriculum"`.

However, this query specifically matches the *phrase* `freecodecamp curriculum`. This means that the results you will see will be limited to sites that say `freecodecamp curriculum` together, not sites that say `freecodecamp` AND `curriculum`.

If you want to match sites that include both of those terms, but not necessarily next to each other as a phrase, you can prefix each term with a plus symbol like this: `+freecodecamp +curriculum`

Alternatively, maybe you're interested in freeCodeCamp's initiatives outside of the curriculum. In this case, you can prefix the term `curriculum` with a minus symbol like this: `+freecodecamp -curriculum`.

This will return results that mention `freecodecamp`, but exclude results that also mention `curriculum`.

Or maybe you have a specific site you want to search, like our news platform? You can use `site:` followed by the URL of the site you want to search: `site:freecodecamp.org/news curriculum`.

This query returns all results from `freecodecamp.org/news` that contain the word `curriculum`.

By combining these tools, you can come up with very specific queries to get the exact information you need.

For example, the query `site:freecodecamp.org/news +python -curriculum` would search for Python articles on our news site, excluding articles that might talk about our curriculum.

Search operators may vary, so it is always important to check the documentation for your preferred search engine.

But you should now be empowered to get the exact results you want from your web searches.

# --questions--

## --text--

What is the purpose of using quotation marks around a search query?

## --answers--

To search for results containing any of the words.

### --feedback--

Think about how quotation marks are used in writing to represent exactly what the author said.

---

To search for an exact phrase.

---

To exclude certain words from the search.

### --feedback--

Think about how quotation marks are used in writing to represent exactly what the author said.

---

To search within a specific website.

### --feedback--

Think about how quotation marks are used in writing to represent exactly what the author said.

## --video-solution--

2

## --text--

Which symbol is used to exclude a term from search results?

## --answers--

`+`

### --feedback--

Remember the example given for searching for freeCodeCamp content while excluding curriculum-related results.

---

`` ` ``

### --feedback--

Remember the example given for searching for freeCodeCamp content while excluding curriculum-related results.

---

`:`

### --feedback--

Remember the example given for searching for freeCodeCamp content while excluding curriculum-related results.

---

`-`

## --video-solution--

4

## --text--

What does the `site:` operator do in a search query?

## --answers--

Excludes a specific site from search results.

### --feedback--

Recall the example using `site:freecodecamp.org/news` to search only the freeCodeCamp News site.

---

Searches for websites similar to the specified site.

### --feedback--

Recall the example using `site:freecodecamp.org/news` to search only the freeCodeCamp News site.

---

Limits the search to a specific website or domain.

---

Ranks the specified site higher in search results.

### --feedback--

Recall the example using `site:freecodecamp.org/news` to search only the freeCodeCamp News site.

## --video-solution--

3

---

### Computer Basics Review
## Understanding Computer, Internet, and Developer Tooling Basics

- **Motherboard**: holds all of the memory, connectors, and hard drives that are needed to run the computer. It serves as the main circuit board for the computer.
- **Central Processing Unit (CPU)**: a processor that is responsible for executing instructions and performing calculations.
- **Random Access Memory (RAM)**: a temporary storage location for the computer's CPU.
- **Hard Disk Drive (HDD)**: a permanent storage location that is used to store data even when the computer is turned off.
- **Solid State Drive (SSD)**: non-volatile flash memory and can be used in place of a hard drive.
- **Power Supply Unit (PSU)**: responsible for converting the electricity from the wall outlet into a form that the computer can use.
- **Graphics Processing Unit (GPU)**: responsible for rendering visuals on the computer screen.
- **Different Types of Internet Service Providers**: An Internet Service Provider (ISP) is a company that provides access to the internet. There are different types of ISPs, including dial-up, DSL, cable, fiber-optic, and satellite.
- **Safe Ways to Sign Into Your Computer**: Examples of safe ways to sign into your computer include using a strong password, enabling two-factor authentication, and using a password manager.
- **Integrated Development Environment (IDE)**: a tool that helps developers write, test, and debug code in an efficient manner.
- **Code Editor**: a tool that developers use to write and debug code.
- **Git**: a popular version control system that allows developers to track changes in their code and collaborate with others.
- **Cloud-based Hosting Services for repositories**: A repository is a storage location for project files and version history. Popular cloud-based hosting services for repositories include GitHub, GitLab, and Bitbucket.
- **Package Managers**: tools that help developers simplify the process of adding, updating, and removing libraries and project dependencies. Examples include npm, pip, and Maven.
- **Testing Libraries and Frameworks**: Testing is done in software to ensure that the code works as expected. Examples of testing libraries and frameworks include Jest, PHPUnit, and JUnit.

## Working With Files, File Systems, and Media Formats

- **Best practices for naming files**: You will want to name your files in a way that is easy to understand and maintain. For example, `about-us.html` is a more descriptive name than `page1.html`.
- **root directory**: top-level directory in a file system. Directory is another name for a folder.
- **Markdown**: a markup language commonly used for documentation and `README` files. A `README` file is a file that contains information about a project, such as how to install and use it.
- **`index.html`**: represents the default page that is displayed when a user visits a website.
- **Create, Move, and Delete files and folders using Explorer/Finder**: Explorer is the file manager in Windows, and Finder is the file manager in macOS. You can use these tools to create, move, and delete files and folders.
- **Searching for files and folders**: You can use the search functionality in Explorer or Finder to find files and folders on your computer.
- **HTML, CSS, and JS File Types**: `.html` file extension is used for HTML files, `.css` for CSS files, and `.js` for JavaScript files.
- **Common Image and Graphic Formats**: `JPEG` and `PNG` are common image file formats. `GIF` is another common image file format that supports animation. `SVG` is a file format for vector graphics.
- **Common Audio and Video Formats**: The `MP3` format is commonly used for audio files. The `MP4` format is commonly used for video files. The `MOV` format was developed by Apple and is commonly used for video files.
- **Common Font Formats**: The `TTF` format is commonly used for TrueType fonts. The `WOFF` format is commonly used for web fonts. The successor to `WOFF` is `WOFF2`, which provides better compression.
- **ZIP**: a file format that is used to compress files and folders.

## Browsing the Web Effectively

- **What is a Web browser?**: a software application that allows users to access and view websites on the internet.
- **What is a Search Engine?**: a tool that allows users to search for information on the internet. Examples include Google, Bing, and Yahoo.
- **Common web browsers**: A few examples of common web browsers include Google Chrome, Mozilla Firefox, and Microsoft Edge.
- **Common Search Strategies**: You can use `site:` followed by the URL of a website to search for content on that website. You can use `filetype:` followed by a file extension to search for files of that type. You can prefix a search term with a minus sign to exclude results containing that term. You can prefix a search term with a plus sign to include results containing that term.

# --assignment--

Review the Computer Basics topics and concepts.

---

### Computer Basics Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What part of a computer is used to connect the other internal components together?

#### --distractors--

Processor

---

Graphics card

---

Memory

#### --answer--

Motherboard

### --question--

#### --text--

What are browser developer tools?

#### --distractors--

Tools for editing browser settings and managing user profiles.

---

Utilities for blocking ads and improving web page performance.

---

Software for managing browser extensions and plug-ins.

#### --answer--

Built-in features in browsers that help developers debug and inspect websites.

### --question--

#### --text--

Which of the following ISP connections are typically the fastest?

#### --distractors--

DSL

---

Satellite

---

Cable

#### --answer--

Fiber optic

### --question--

#### --text--

Which of the following is NOT a safe practice when signing in?

#### --distractors--

Using a fingerprint or face scanner.

---

Making a long and complex password like `@ppl3_+B@nana34823`.

---

Setting up two-factor authentication (2FA).

#### --answer--

Using passwords based on personal information like your birthday.

### --question--

#### --text--

Which of the following is NOT a web browser?

#### --distractors--

Safari

---

Opera

---

Microsoft Edge

#### --answer--

Google Drive

### --question--

#### --text--

When you need to edit a piece of code, which of the following are you most likely going to use?

#### --distractors--

Node Package Manager

---

Microsoft Edge

---

GitHub

#### --answer--

Visual Studio Code

### --question--

#### --text--

Which of the following is used primarily for managing files stored on a local hard drive?

#### --distractors--

Dropbox

---

Microsoft OneDrive

---

Google Drive

#### --answer--

Windows File Explorer

### --question--

#### --text--

What is NOT a good practice when naming files?

#### --distractors--

Putting an underscore or hyphen between words.

---

Using a consistent casing style such as camelCase.

---

Putting a version number at the end of a document like `summaryReport_v2.docx`.

#### --answer--

Using non-descriptive names like `file1.txt`.

### --question--

#### --text--

What does the term "domain name" refer to?

#### --distractors--

A type of software that manages website files and databases.

---

The physical location of a web server in a data center.

---

None of the other choices.

#### --answer--

The address used to identify websites on the internet.

### --question--

#### --text--

Which of the following is a way to send a file to the Recycle Bin/Trash?

#### --distractors--

All of the other choices.

---

Pressing the `Backspace` key on the keyboard.

---

Moving it to an Archived folder.

#### --answer--

Right-click on it and select the Delete/Move to trash option.

### --question--

#### --text--

What is RAM?

#### --distractors--

A network protocol used for transferring files between devices.

---

A permanent storage device used for saving files and applications.

---

A component in a computer responsible for generating graphics and rendering images.

#### --answer--

A temporary memory for fast data access by the processor.

### --question--

#### --text--

What file type will be best suited for writing a `README` file?

#### --distractors--

`.php`

---

`.html`

---

`.json`

#### --answer--

`.md`

### --question--

#### --text--

What is an Integrated Development Environment (IDE)?

#### --distractors--

A platform designed for deploying and hosting web applications.

---

A type of hardware device used for testing and debugging electronic circuits.

---

A version control system that helps developers track changes in source code during software development.

#### --answer--

A program that integrates tools for writing, debugging, and running code.

### --question--

#### --text--

What is a piece of software that allows you to look at online content called?

#### --distractors--

Internet content displayer

---

Search engine

---

Website

#### --answer--

Web browser

### --question--

#### --text--

What is a piece of software that lists web pages related to a user's query called?

#### --distractors--

Page finder

---

Web browser

---

Website

#### --answer--

Search engine

### --question--

#### --text--

What is a set of one or more web pages under one domain name called?

#### --distractors--

Web browser

---

Hyperlink

---

Search engine

#### --answer--

Website

### --question--

#### --text--

To search for an exact phrase, what should you enclose your search query with?

#### --distractors--

Backticks

---

Parentheses

---

Brackets

#### --answer--

Quotation marks

### --question--

#### --text--

Which is NOT a way to install a web browser?

#### --distractors--

Using a package manager.

---

Directly downloading from the website.

---

Using an App Store like Microsoft Store.

#### --answer--

Pressing the Network/Internet button in Settings.

### --question--

#### --text--

Which of the following formats does NOT preserve image quality after compression?

#### --distractors--

All of the other choices.

---

PNG

---

SVG

#### --answer--

JPEG

### --question--

#### --text--

Which of the following parts is located in a socket on the motherboard?

#### --distractors--

The router

---

The keyboard

---

The hard drive (HDD)

#### --answer--

The CPU

## --quiz--

### --question--

#### --text--

Which of the following is a basic part of the computer?

#### --distractors--

The word processor

---

The task manager

---

The memory manager

#### --answer--

The central processing unit

### --question--

#### --text--

What is a pointing device for a computer?

#### --distractors--

A stick for pointing at computers

---

A retractable device used in PowerPoint presentations

---

A laser pointer

#### --answer--

A mouse or touchpad

### --question--

#### --text--

What is a type of ISP?

#### --distractors--

Satellite

---

Fiber optic

---

Dial-up

#### --answer--

Tier 1

### --question--

#### --text--

What is a best practice when naming files for a web application?

#### --distractors--

Using special characters.

---

Using spaces to separate the words.

---

Using generic words.

#### --answer--

Using hyphens instead of spaces.

### --question--

#### --text--

Which of the following is a common file type when working with web applications?

#### --distractors--

`.xls`

---

`.aud`

---

`.doc`

#### --answer--

`.css`

### --question--

#### --text--

What is a common file type for a video file?

#### --distractors--

`.vid`

---

`.mp3`

---

`.wav`

#### --answer--

`.mp4`

### --question--

#### --text--

Which of the following types is commonly used for image files?

#### --distractors--

`.pix`

---

`.ppg`

---

`.gfi`

#### --answer--

`.svg`

### --question--

#### --text--

Microsoft Edge is the default web browser of which operating system?

#### --distractors--

Linux

---

macOS

---

Unix

#### --answer--

Windows

### --question--

#### --text--

What is a search engine?

#### --distractors--

A part of the hard drive of a computer.

---

Advanced software that is only used by academic researchers.

---

A tool for finding web components.

#### --answer--

A web-based tool for searching information on the internet.

### --question--

#### --text--

Which of the following is NOT a type of browser?

#### --distractors--

Google Chrome

---

Mozilla Firefox

---

Microsoft Edge

#### --answer--

GitHub

### --question--

#### --text--

Which of the following is NOT a cloud-based hosting service for repositories?

#### --distractors--

GitHub

---

GitLab

---

Bitbucket

#### --answer--

Ona

### --question--

#### --text--

Which of the following is NOT primarily a part of an integrated development environment?

#### --distractors--

A tool for writing.

---

A tool for testing code.

---

A tool for debugging code.

#### --answer--

A tool for storing code.

### --question--

#### --text--

What is a best practice for naming files?

#### --distractors--

Creating a script that uses the same file names for all your projects.

---

Naming the main file with the same name as the folder it is in.

---

Using a unique sequence of numbers at the end of the file name.

#### --answer--

Using a descriptive name for each file.

### --question--

#### --text--

What is the built-in way you can use to search for files on your computer?

#### --distractors--

Google or Firefox

---

A search engine

---

GitHub

#### --answer--

The file explorer

### --question--

#### --text--

What is a common search strategy to search for file types?

#### --distractors--

`site:`

---

`typeof:`

---

`type:`

#### --answer--

`filetype:`

### --question--

#### --text--

What is the default page for a website?

#### --distractors--

`styles.css`

---

`main.html`

---

`home.html`

#### --answer--

`index.html`

### --question--

#### --text--

Which file managers can you use to create, move, and delete files?

#### --distractors--

Google or Bing

---

Windows or macOS

---

Findex or Firefox

#### --answer--

Explorer or Finder

### --question--

#### --text--

What is Git?

#### --distractors--

A centralized storage location for code repositories.

---

A tool for adding, updating, and removing libraries and project dependencies.

---

A cloud-based hosting service for repositories.

#### --answer--

A version control system for tracking changes and collaborating with others.

### --question--

#### --text--

What is random access memory?

#### --distractors--

A permanent storage location that is used to store data.

---

A volatile way to access data in a sequential manner.

---

A processor used for generating passwords.

#### --answer--

A temporary storage location for the computer's central processing unit.

### --question--

#### --text--

Which file format is used to compress files?

#### --distractors--

`TTF`

---

`MOV`

---

`ZAP`

#### --answer--

`ZIP`

---

# CSS

## basic-css

### What Is CSS, and What Is Its Role on the Web?


---

### What Is the Basic Anatomy of a CSS Rule?


---

### What Is the Meta Viewport Element Used For?
The meta viewport element is a crucial component in responsive web design.

It's a special HTML meta element that gives the browser instructions on how to control the page's dimensions and scaling on different devices, particularly on mobile phones and tablets.

Let's take a look at the basic syntax of the meta viewport element:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This element is typically placed in the `head` section of your HTML document. But what does each part of the element mean?

The `width=device-width` part tells the browser to set the width of the page to match the screen width of the device. This is essential for creating responsive layouts that adapt to different screen sizes.

The `initial-scale=1.0` sets the initial zoom level when the page is first loaded. A value of 1.0 means that the page is displayed at `100%` zoom, without any scaling.

By using the meta viewport element, you're ensuring that your web pages are displayed properly on mobile devices.

Without it, mobile browsers will typically render the page at a desktop screen width and then scale it down, which can result in a poor user experience with tiny, hard-to-read text.

The meta viewport element also allows you to control whether users can zoom in and out of your web pages.

While it's possible to disable zooming with the `user-scalable=no` attribute, it's generally recommended to avoid this for accessibility reasons.

Many users rely on the ability to zoom for better readability, especially those with visual impairments.

Here's an example of what not to do:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

Instead, it's better to design your website to be responsive and readable at different zoom levels, ensuring that all users can comfortably access your content.

The meta viewport element plays a crucial role in creating mobile-friendly websites.

It ensures that your carefully crafted responsive designs are displayed as intended on various devices, providing a better user experience for all visitors to your site.

# --questions--

## --text--

What is the primary purpose of the `<meta name="viewport">` tag?

## --answers--

To improve website loading speed.

### --feedback--

Think about how websites adapt to different screen sizes.

---

To control page dimensions and scaling on different devices.

---

To provide page descriptions for search engines.

### --feedback--

Think about how websites adapt to different screen sizes.

---

To enable JavaScript functionality.

### --feedback--

Think about how websites adapt to different screen sizes.

## --video-solution--

2

## --text--

What does `width=device-width` in the `<meta name="viewport">` tag do?

## --answers--

It sets the width of all images to match the device width.

### --feedback--

Consider how this attribute relates to responsive design.

---

It tells the browser to match the page width to the device's screen width.

---

It adjusts the font size based on the device width.

### --feedback--

Consider how this attribute relates to responsive design.

---

It limits the maximum width of the webpage.

### --feedback--

Consider how this attribute relates to responsive design.

## --video-solution--

2

## --text--

Why is it generally recommended to avoid using `user-scalable=no` in the `<meta name="viewport">` tag?

## --answers--

It can cause the website to crash on certain devices.

### --feedback--

Think about how this might affect users with different needs.

---

It prevents the website from being indexed by search engines.

### --feedback--

Think about how this might affect users with different needs.

---

It can create accessibility issues for users who need to zoom.

---

It makes the website load slower on mobile devices.

### --feedback--

Think about how this might affect users with different needs.

## --video-solution--

3

---

### What Are Some Default Browser Styles Applied to HTML?


---

### What Are Inline, Internal, and External CSS, and When Should You Use Each One?


---

### How Do Width and Height Work?


---

### What Are the Different Types of CSS Combinators?


---

### What Is the Difference Between Inline and Block-Level Elements in CSS?


---

### How Does Inline-Block Work, and How Does It Differ from Inline and Block Elements?


---

### What Are Margins and Padding, and How Do They Work?


---

### Step 1
In this workshop, you will practice the basics of CSS (Cascading Style Sheets) by building a cafe menu.

Start by adding some menu content. Add a `main` element within the existing `body` element. It will eventually contain pricing information about coffee and desserts offered by the cafe.

---

### Step 2
The name of the cafe is `CAMPER CAFE`. So, add an `h1` element within your `main` element. Give it the name of the cafe in capitalized letters to make it stand out.

---

### Step 3
To let visitors know the cafe was founded in `2020`, add a `p` element below the `h1` element with the text `Est. 2020`.

---

### Step 7
In previous lessons, you learned how to add `CSS` properties and values like this:

```css
element {
 property: value;
}
```

Center the content of the `h1` element by setting its `text-align` property to the value `center`.

---

### Step 6
Until now, you've had limited control over the presentation and appearance of your content. To change that, add a `style` element within the `head` element.

---

### Step 5
Create an `h2` element in the `section` element and give it the text `Coffee`.

---

### Step 4
There will be two sections on the menu, one for coffees and one for desserts. Add a `section` element within the `main` element so you have a place to put all the coffees available.

---

### Step 9
You now have three type selectors with the same styling. You can add the same group of styles to many elements by creating a list of selectors. Each selector is separated with commas like this:

```css
selector1, selector2 {
  property: value;
}
```

Delete the three existing type selectors and replace them with one selector list that centers the text for the `h1`, `h2`, and `p` elements.

---

### Step 11
Now that you have the CSS in the `styles.css` file, go ahead and remove the `style` element and all its content. Once it is removed, the text that was centered will shift back to the left.

---

### Step 8
In the previous step, you used a <dfn>type selector</dfn> to style the `h1` element. Center the content of the `h2` and the `p` elements by adding a new type selector for each one to the existing `style` element.

---

### Step 10
You have styled three elements by writing CSS inside the `style` tags. This works, but since there will be many more styles, it's best to put all the styles in a separate file and link to it.

A separate `styles.css` file has been created for you. You can switch between files with the tabs at the top of the editor.

Start by rewriting the styles you have created into the `styles.css` file. Make sure you exclude the opening and closing `style` tags.

---

### Step 12
Now you need to link the `styles.css` file, so the styles will be applied again. Inside the `head` element, add a `link` element. Give it a `rel` attribute with the value of `"stylesheet"` and an `href` attribute with the value of `"styles.css"`.

**Note:** The `link` element is a void element, which means it doesn't have a closing tag. Void elements should be written as `<link>` rather than `<link></link>`.

---

### Step 14
The text is centered again so the link to the CSS file is working. Add another style to the file that changes the `background-color` property to `brown` for the `body` element.

---

### Step 13
For the styling of the page to look similar on mobile as it does on a desktop or laptop, you need to add a `meta` element with a special `content` attribute.

You learned about the viewport `meta` element in previous lessons.

Here is an example:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

### Step 15
That brown background makes it hard to read the text. Change the `body` element's background color to `burlywood` so it has some color, but you are still able to read the text.

---

### Step 20
Now it's easy to see that the text is centered inside the `#menu` element. Currently, the width of the `#menu` element is specified in pixels (`px`). 

Change the `width` property's value to be `80%`, to make it `80%` the width of its parent element (`body`).

---

### Step 18
Comments in CSS look like this:

```css
/* comment here */
```

In your style sheet, comment out the line containing the `background-color` property and value, so you can see the effect of only styling the `#menu` element. This will make the background white again.

---

### Step 22
So far you have been using type and id selectors to style elements. However, it is more common to use a different selector to style your elements. 

You learned how to work with `class` selectors in previous lessons like this:

```css
.class-name {
  styles
}
```

Change the existing `#menu` selector into a class selector by replacing `#menu` with a class named `.menu`.

---

### Step 17
The goal now is to make the `div` not take up the entire width of the page. The CSS `width` property is perfect for this.

You can use the `id` selector to target a specific element with an `id` attribute. 

You learned how to work with the `id` selector in previous lessons like this:

```css 
#cat {
  width: 250px;
}
```

Use the `#menu` selector to give your element a width of `300px`.

---

### Step 19
Now use the existing `#menu` selector to set the background color of the `div` element to be `burlywood`.

---

### Step 21
Next, you want to center the `#menu` horizontally. You can do this by setting its `margin-left` and `margin-right` properties to `auto`. Think of the margin as an invisible space around an element. Using these two margin properties, center the `#menu` element within the `body` element.

---

### Step 23
To apply the class's styling to the `div` element, remove the `id` attribute and add a `class` attribute to the `div` element's opening tag. Make sure to set the class value to `menu`.

---

### Step 16
The `div` element is used mainly for design layout purposes, unlike the other content elements you have used so far. Add a `div` element inside the `body` element and then move all the other elements inside the new `div`.

Inside the opening `div` tag, add the `id` attribute with a value of `menu`.

---

### Step 25
Now that things look good, it's time to start adding some menu items.

Add an empty `article` element under the `Coffee` heading. It will contain a flavor and price of each coffee you currently offer.

---

### Step 24
Since the cafe's main product for sale is coffee, you could use an image of coffee beans as the page background.

Remove the comment and its contents inside the `body` type selector. After that, add a `background-image` property and set its value to `url(https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg)`.

---

### Step 34
That's closer, but the price didn't stay over on the right. This is because `inline-block` elements only take up the width of their content.

To spread them out, add a `width` property to the `flavor` and `price` class selectors that have a value of `50%` each.

---

### Step 28
The flavors and prices are currently stacked on top of each other and centered with their respective `p` elements. It would be nice if the flavor was on the left and the price was on the right.

Add the class name `flavor` to the `French Vanilla` element.

---

### Step 27
Starting below the existing coffee/price pair, add the following coffee and prices using `article` elements with two nested `p` elements inside each.

```md
Caramel Macchiato 3.75
Pumpkin Spice 3.50
Hazelnut 4.00
Mocha 4.50
```

As before, the first `p` element's text should contain the coffee flavor and the second `p` element's text should contain the price.

---

### Step 26
`article` elements commonly contain multiple elements that have related information. In this case, it will contain a coffee flavor and a price for that flavor.

Nest two `p` elements inside your `article` element. The first one's text should be `French Vanilla`, and the second's text `3.00`.

---

### Step 33
The `p` elements are nested in an `article` element with the class attribute of `item`. You can style all the `p` elements nested anywhere in elements with a class named `item` like this:

```css
.item p { }
```

Using the above selector, add a `display` property with value `inline-block` so the `p` elements behave more like inline elements.

---

### Step 35
Well, that did not work. Styling the `p` elements as `inline-block` and placing them on separate lines creates an extra space to the right of the first `p` element, causing the second one to shift to the next line.

One way to fix that is to make each `p` element's width slightly less than `50%`. So, change the `width` value to `49%` for each class to see what happens.

---

### Step 32
That is kind of what you want, but now it would be nice if the flavor and price were on the same line. `p` elements are <dfn>block-level</dfn> elements, so they take up the entire width of their parent element.

To get them on the same line, you need to apply some styling to the `p` elements so they behave more like <dfn>inline</dfn> elements.

To do that, start by adding a `class` attribute with the value `item` to the first `article` element under the `Coffee` heading.

---

### Step 37
Now go ahead and change both the `flavor` and `price` class' widths to be `50%` again.

---

### Step 38
Now that you know it works, you can change the remaining `article` and `p` elements to match the first set. Start by adding the class `item` to the other `article` elements.

---

### Step 42
You will come back to styling the menu in a few steps, but for now, go ahead and add a second `section` element below the first for displaying the desserts offered by the cafe.

---

### Step 36
That worked, but there is still a little space on the right of the price.

You could keep trying various percentages for the widths. Instead, use the backspace key to move the `p` element with the class `price` next to the `p` element with the class `flavor` so that they are on the same line in the editor. Make sure there is no space between the two elements.

---

### Step 63
You can use an `hr` element to display a divider between sections of different content.

```html
<section>
  <h2>Things cats love</h2>
  <hr>
  <p>Cats love lasagna.</p>
</section>
```

First, add an `hr` element between the `p` element with the class `established` and the first `section` element.

Note that the `hr` element is a void element.

---

### Step 52
The current width of the menu will always take up 80% of the `body` element's width. On a very wide screen, the coffee and dessert appear far apart from their prices.

Add a `max-width` property to the `menu` class with a value of `500px` to prevent it from growing too wide.

---

### Step 51
Since all `4` sides of the menu have the same internal spacing, remove the four properties and use a single `padding` property with the value `20px`.

---

### Step 50
That looks better. Now try to add the same `20px` padding to the top and bottom of the menu.

---

### Step 53
You can change the `font-family` of text, to make it look different from the default font of your browser. Each browser has some common fonts available to it.

Change all the text in your `body`, by adding a `font-family` property with the value `sans-serif`. This is a fairly common font that is very readable.

---

### Step 54
It is a bit boring for all the text to have the same `font-family`. You can still have the majority of the text `sans-serif` and make just the `h1` and `h2` elements different using a different selector.

Style both the `h1` and the `h2` elements using a single selector so that these elements' text use `Impact` font.

---

### Step 56
Italicize the `Est. 2020` by creating an `established` class selector and giving it a `font-style` property of `italic`.

---

### Step 59
Add a `footer` element below the `main` element, where you can add some additional information.

---

### Step 44
Add an empty `article` element under the `Desserts` heading. Give it a `class` attribute with the value `item`.

---

### Step 57
Now apply the `established` class to the `Est. 2020` text.

---

### Step 61
Inside the `address`, add a `p` element. Then, nest an anchor (`a`) element in the `p` that links to `https://www.freecodecamp.org` and has the text `Visit our website`.

Make sure that the link opens in a new tab by adding a `target` attribute with the value `_blank`.

---

### Step 62
Add a second `p` element below the one with the link and give it the text `123 Free Code Camp Drive`.

---

### Step 43
Add an `h2` element in the new section and give it the text `Desserts`.

---

### Step 55
You can add a <dfn>fallback</dfn> value for the font-family by adding another font name separated by a comma. Fallbacks are used in instances where the initial is not found/available.

Add the fallback font `serif` after the `Impact` font.

---

### Step 49
You can give your menu some space between the content and the sides with various `padding` properties.

Give the `menu` class a `padding-left` and a `padding-right` with the same value `20px`.

---

### Step 58
The typography of heading elements (e.g. `h1`, `h2`) is set by default values of users' browsers.

Add two new type selectors (`h1` and `h2`). Use the `font-size` property for both, but use the value `40px` for the `h1` and `30px` for the `h2`.

---

### Step 64
The default properties of an `hr` element will make it appear as a thin light grey line. You can change the height of the line by specifying a value for the `height` property.

Change the height of the `hr` element to `3px`.

---

### Step 65
Change the background color of the `hr` element to `brown` so it matches the color of the coffee beans.

---

### Step 66
Notice the grey color along the edges of the line. Those edges are known as <dfn>borders</dfn>. Each side of an element can have a different color or they can all be the same.

Make all the edges of the `hr` element the same color as the background of it using the `border-color` property.

---

### Step 67
Notice how the thickness of the line looks bigger? The default value of a property named `border-width` is `1px` for all edges of `hr` elements. By changing the border to the same color as the background, the total height of the line is `5px` (`3px` plus the top and bottom border width of `1px`).

Change the `height` property of the `hr` to `2px`, so the total height of it becomes `4px`.

---

### Step 68
Go ahead and add another `hr` element between the `main` element and the `footer` element.

---

### Step 69
To create a little more room around the menu, add `20px` of space on the inside of the `body` element by using the `padding` property.

---

### Step 70
Focusing on the menu items and prices, there is a fairly large gap between each line.

Use the existing selector that targets all the `p` elements nested in elements with the class named `item` and set their top and bottom margin to `5px`.

---

### Step 71
Using the same style selector in the previous step, make the font size of the items and prices larger by using a value of `18px`.

---

### Step 75
Moving down to the `footer` element, make all the text have a value of `14px` for the font size.

---

### Step 77
The default color of a link that has not yet been clicked on is typically blue. The default color of a link that has already been visited from a page is typically purple.

To make the `footer` links the same color regardless if a link has been visited, use a type selector for the anchor element (`a`) and use the value `black` for the `color` property.

---

### Step 78
You change the properties of a link when the link has been visited by using a <dfn>pseudo-selector</dfn> that looks like `a:visited { propertyName: propertyValue; }`.

Change the color of the footer `Visit our website` link to `grey` when a user has visited the link.

---

### Step 79
You change the properties of a link when the mouse hovers over them by using a <dfn>pseudo-selector</dfn> that looks like `a:hover { propertyName: propertyValue; }`.

Change the color of the footer `Visit our website` link to be `brown` when a user hovers over it.

---

### Step 80
You change the properties of a link when the link is being clicked by using a <dfn>pseudo-selector</dfn> that looks like `a:active { propertyName: propertyValue; }`.

Change the color of the footer `Visit our website` link to `white` when clicked on.

---

### Step 81
To maintain the existing black and brown color theme, change the color for when the link is visited to `black` and use `brown` for when the link is actually clicked.

---

### Step 82
The menu text `CAMPER CAFE` has a different space from the top than the address's space at the bottom of the menu. This is due to the browser having some default top margin for the `h1` element.

Change the top margin of the `h1` element to `0` to remove all the top margin.

---

### Step 83
To remove some of the vertical space between the `h1` element and the text `Est. 2020`, change the bottom margin of the `h1` to `15px`.

---

### Step 84
Now the top spacing looks good. The space below the address at the bottom of the menu is a little bigger than the space at the top of the menu and the `h1` element.

To decrease the default margin space below the address `p` element, create a class selector named `address` and use the value `5px` for the `margin-bottom` property.

---

### Step 85
Now apply the `address` class to the `p` element containing the street address `123 Free Code Camp Drive`.

---

### Step 86
The menu looks good, but other than the coffee beans background image, it is mainly just text.

Under the `Coffee` heading, add an image using the url `https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg`. Give the image an `alt` value of `coffee icon`.

---

### Step 74
Next, you are going to be styling the `footer` element. To keep the CSS organized, add a comment at the end of `styles.css` with the text `FOOTER`.

---

### Step 72
Changing the `margin-bottom` to `5px` looks great. However, now the space between the `Cinnamon Roll` menu item and the second `hr` element does not match the space between the top `hr` element and the `Coffee` heading.

Add some more space by creating a class named `bottom-line` using `25px` for the `margin-top` property.

---

### Step 73
Now add the `bottom-line` class to the second `hr` element so the styling is applied.

---

### Step 87
The image you added is not centered horizontally like the `Coffee` heading above it. `img` elements are "like" inline elements.

To make the image behave like block-level elements such as headings, create an `img` type selector. Set the `display` property to `block`, and use `margin-left` and `margin-right` properties to center it horizontally.

---

### Step 88
Add one last image under the `Desserts` heading using the URL `https://cdn.freecodecamp.org/curriculum/css-cafe/pie.jpg`. Give the image an `alt` value of `pie icon`.

---

### Step 41
If you make the width of the page preview smaller, you will notice at some point, some of the text on the left starts wrapping around to the next line. This is because the width of the `p` elements on the left side can only take up `50%` of the space.

Since the prices on the right have significantly fewer characters, update the `flavor` class `width` to `75%` and the price class `width` to `25%`.

---

### Step 89
It would be nice if the vertical space between the `h2` elements and their associated icons was smaller. The `h2` elements have default top and bottom margin space, so you could change the bottom margin of the `h2` elements to say `0` or another number.

There is an easier way, simply add a negative top margin to the `img` elements to pull them up from their current positions. Negative values are created using a `-` in front of the value. To complete this workshop, go ahead and use a negative top margin of `25px` in the `img` type selector.

Congratulations! You have completed the Cafe Menu workshop.

---

### Step 45
Nest two `p` elements inside your `article` element. The first one's text should be `Donut`, and the second's text `1.50`. Put both of them on the same line making sure there is no space between them.

---

### Step 48
Below the dessert you just added, add the rest of the desserts and prices using three more `article` elements, each with two nested `p` elements. Each element should have the correct dessert and price text, and all of them should have the correct classes.

```md
Cherry Pie 2.75
Cheesecake 3.00
Cinnamon Roll 2.50
```

---

### Step 39
Next, position the other `p` elements to be on the same line with no space between them.

---

### Step 40
To complete the styling, add the applicable class names `flavor` and `price` to all the remaining `p` elements.

---

### Step 29
Using your new `flavor` class as a selector, set the `text-align` property's value to `left`.

---

### Step 30
Next, you want to align the price to the right. Add a class named `price` to your `p` element that has `3.00` as its text.

---

### Step 31
Now align the text to the `right` for the elements with the `price` class.

---

### Step 46
For the two `p` elements you just added, add `dessert` as the value of the first `p` element's `class` attribute and the value `price` as the second `p` element's `class` attribute.

---

### Step 47
Something does not look right. You added the correct `class` attribute value to the `p` element with `Donut` as its text, but you have not defined a selector for it.

The CSS rule for the `flavor` class already sets the properties you want. Add the `dessert` class as an additional selector for this CSS rule.

---

### Step 60
Inside the `footer`, add an `address` element. You will add contact information to this element in the next few steps.

---

### Step 76
The default styling of the `address` element is to have `font-style` set to `italic`. Add a selector for the `address` element and set its `font-style` to `normal`.

---

### Design a Business Card
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `div` with a `class` attribute with a value of `business-card` that will contain all the other elements. 
1. Inside the `.business-card` element, there should be an `img` element with a `class` attribute with a value of `profile-image`. You can set the image source to `https://cdn.freecodecamp.org/curriculum/labs/flower.jpg` if you like. There should be an `alt` with a meaningful description.
1. Inside the `.business-card` element, after the `img` element, you should have three `p` elements with a `class` attribute that has, respectively, a value of `full-name`, `designation`, and `company`.
1. The first `p` element should contain your name.
1. The second `p` element should contain your designation.
1. The third `p` element should have your company name. 
1. There should be an `hr` element below the third `p` element.
1. After the `hr` element, there should be two `p` elements. In the first `p` element, you should have an email address as the text. In the second `p` element, the text should be a phone number.
1. After the two `p` elements, there should be an `a` element with a class of `portfolio-link`, the text `Portfolio`, and it should link to a valid URL.
1. There should be an `hr` element after the `a` element containing the portfolio link.
1. You should have another `div` element with a `class` attribute with a value of `social-media`. Within this element, there should be an `h2` element with the text `Connect with me`. 
1. Inside the `.social-media` elements, there should be three `a` elements. The `a` elements should have the text `Twitter`, `LinkedIn` and `GitHub` respectively with links to valid websites.
1. You should link the style sheet `styles.css` using the `link` tag in the `head` section of the HTML file.
1. Your page background should be `rosybrown`. The overall font should be `Arial`, with a fallback of `sans-serif`.   
1. The `.business-card` selector should have properties to set the element as `300px` wide and a background color of your choice. Also you should set a `padding` of `20px` all around and a top `margin` of `100px`. The text should be center aligned and the font size should be `16px`. The left and right margins should be set to `auto`.
1. The `.profile-image` selector should have a `max-width` property with a value of `100%`.
1. All of the `p` elements should have a top and bottom `margin` of `5px`.
1. All links on the page should not be underlined.

---

### What Is CSS Specificity, and the Specificity for Inline, Internal, and External CSS?


---

### What Is the Universal Selector, and What Is Its Specificity?


---

### What Is the Specificity for Type Selectors?


---

### What Is the Specificity for Class Selectors?


---

### What Is the Specificity for ID Selectors?


---

### What Is the important Keyword, and What Are the Best Practices for Using It?


---

### How Does the Cascade Algorithm Work at a High Level?


---

### How Does Inheritance Work with CSS at a High Level?


---

### CSS Fundamentals Review


---

### CSS Fundamentals Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What does CSS stand for?

#### --distractors--

Cascading Style Script

---

Concatenating Style Script

---

Castor Sage Style

#### --answer--

Cascading Style Sheets

### --question--

#### --text--

Which of the following is a correct CSS rule?

#### --distractors--

`p=red`

---

`p (color: red)`

---

`{p color: red;}`

#### --answer--

`p {color: red;}`

### --question--

#### --text--

What does `<meta name="viewport">` do?

#### --distractors--

It links external stylesheets to a webpage for responsive design.

---

It specifies the metadata used by search engines to index a webpage.

---

It specifies the character encoding used on the webpage.

#### --answer--

It controls the shape and size of a web page on different screen sizes.

### --question--

#### --text--

Which syntax is correct to use inline CSS?

#### --distractors--

`<p color =  blue></p>`

---

`<p><style = blue></p>`

---

`p {color: blue;}`

#### --answer--

`<p style="color: blue;"></p>`

### --question--

#### --text--

When using internal CSS, where is the `style` element placed within the HTML?

#### --distractors--

In the `meta` element.

---

In the `script` element.

---

In the `body` element.

#### --answer--

In the `head` element.

### --question--

#### --text--

Which rule is correct for setting the width and height in CSS?

#### --distractors--

`height-width: 50px;`

---

`width-and-height: 50px;`

---

`flex-width: 50px; flex-height: 50px;`

#### --answer--

`width: 50px; height: 50px;`

### --question--

#### --text--

Which selector correctly targets `h1` elements only when inside a `div`?

#### --distractors--

`div, h1 {}`

---

`div ~ h1 {}`

---

`div + h1 {}`

#### --answer--

`div h1 {}`

### --question--

#### --text--

Which selector is correct to target direct children of a `footer`?

#### --distractors--

`footer ~ ul {}`

---

`footer + ul {}`

---

`footer ul {}`

#### --answer--

`footer > ul {}`

### --question--

#### --text--

Which selector is correct to target the next sibling of an `img`?

#### --distractors--

`img h1 {}`

---

`img > h1 {}`

---

`img ~ h1 {}`

#### --answer--

`img + h1 {}`

### --question--

#### --text--

Which selector is correct to target all siblings preceded by an `img` element?

#### --distractors--

`img > caption {}`

---

`img caption {}`

---

`img + caption {}`

#### --answer--

`img ~ caption {}`

### --question--

#### --text--

What statement is TRUE about block-level elements?

#### --distractors--

Block-level elements stack horizontally by default.

---

`width` and `height` properties usually do not apply to block-level elements unless you set their `display` property to `inline-block`.

---

Block-level elements cannot contain inline elements inside them.

#### --answer--

Block-level elements start on a new line and take up the full width of their container.

### --question--

#### --text--

What statement is TRUE when using the `inline-block` value?

#### --distractors--

Elements stack vertically, always taking up the full width of their container.

---

Elements align horizontally but cannot apply vertical padding or margin.

---

Elements respect width and height settings but cannot contain other elements inside them.

#### --answer--

Elements retain inline flow but allow setting width and height.

### --question--

#### --text--

Given the following selectors, which has the highest specificity?

#### --distractors--

`div`

---

`h1`

---

`p`

#### --answer--

`#id`

### --question--

#### --text--

Given the following selectors, which has the lowest specificity?

#### --distractors--

`#id`

---

`.class`

---

`div h1`

#### --answer--

`h1`

### --question--

#### --text--

What does the `*` selector do?

#### --distractors--

Targets some elements on the page.

---

Targets elements that have children on the page.

---

Targets all `p` elements on the page.

#### --answer--

Targets all elements on the page.

### --question--

#### --text--

What does `!important` do in CSS?

#### --distractors--

It makes the CSS rule work exclusively for inline styles and ignores styles defined in external or internal stylesheets.

---

It disables all other CSS properties applied to the same element, effectively making it the only rule that affects the element's styling.

---

It applies only to a certain selector or group of elements.

#### --answer--

It overrides any other values applied to the property for that selector.

### --question--

#### --text--

How does the CSS Cascade algorithm work?

#### --distractors--

It determines styles of the element based on order of declaration, regardless of other factors.

---

It applies styles based solely on the order they are written, ignoring specificity.

---

It applies styles prioritizing specificity, ignoring origin and relevance.

#### --answer--

It determines styles of the element based on specificity and order of declaration.

### --question--

#### --text--

Which rule applies `32px` of margin to all sides?

#### --distractors--

`margin-top: 32px;`

---

`margin: 32px 0;`

---

`margin: 0 32px;`

#### --answer--

`margin: 32px;`

### --question--

#### --text--

Which rule applies `24px` padding to the top and bottom?

#### --distractors--

`padding: 24px;`

---

`padding-top-bottom: 24px;`

---

`padding: 0 24px;`

#### --answer--

`padding: 24px 0;`

### --question--

#### --text--

For `padding: 10px 20px 30px 40px`, what is the correct order of values?

#### --distractors--

Right, Top, Left, Bottom.

---

Top, Left, Bottom, Right.

---

Top, Bottom, Right, Left.

#### --answer--

Top, Right, Bottom, Left.

## --quiz--

### --question--

#### --text--

What are the main parts of a CSS rule?

#### --distractors--

Elements and attributes

---

Style and sheets

---

Scripts and values

#### --answer--

Selectors and declaration blocks

### --question--

#### --text--

Which of the following is the correct syntax for a CSS rule?

#### --distractors--

```css
body [
  font-family: Arial;
]
```

---

```css
font-family {
  body: Arial;
}
```

---

```css
body {
  font-family; Arial:
}
```

#### --answer--

```css
body {
  font-family: Arial;
}
```

### --question--

#### --text--

What are default browser styles?

#### --distractors--

HTML elements that have the same styling properties regardless of the browser.

---

They are mandatory styles that you must use for specific HTML elements.

---

They are the color themes for the various browsers.

#### --answer--

The CSS rules that browsers apply automatically.

### --question--

#### --text--

What is the default value for the `width` property?

#### --distractors--

`none`

---

`0`

---

`100%`

#### --answer--

`auto`

### --question--

#### --text--

What does the `min-height` property specify?

#### --distractors--

The starting height for an element.

---

The height for an element.

---

The maximum height for an element.

#### --answer--

The minimum height for an element.

### --question--

#### --text--

Which of the following is TRUE about the universal selector `*`?

#### --distractors--

It has the highest specificity because it can style all the elements on a page.

---

It contributes 1 to all parts of the specificity value.

---

It cannot reset styles across different browsers.

#### --answer--

It has the lowest specificity value of any selector.

### --question--

#### --text--

Which selector correctly targets `li` elements for an ordered list?

#### --distractors--

`li {}`

---

`ul li {}`

---

`ol + li {}`

#### --answer--

`ol li {}`

### --question--

#### --text--

Which selector targets the paragraph elements of a `div` element?

#### --distractors--

`p div {}`

---

`div, p {}`

---

`p, div {}`

#### --answer--

`div p {}`

### --question--

#### --text--

Where does the `margin` apply styling properties?

#### --distractors--

The space inside the element.

---

Between the content and the border.

---

On the border of the element.

#### --answer--

The space outside the element.

### --question--

#### --text--

Where does the `padding` property apply styling?

#### --distractors--

Between the element's border and the surrounding elements.

---

The space outside the element.

---

On the border of the element.

#### --answer--

The space inside the element.

### --question--

#### --text--

Which statement is FALSE about block-level elements?

#### --distractors--

They can stretch to fit the width of their container.

---

Common block-level elements include `div`, `p`, and `section`.

---

Block-level elements start on a new line and take up the full width of their container.

#### --answer--

They cannot take up the full width available as they are blocked from doing so.

### --question--

#### --text--

Which statement is FALSE when using the `inline-block` value?

#### --distractors--

`inline-block` elements behave like inline elements.

---

They can have `width` and `height` properties.

---

Elements retain inline flow but allow setting `width` and `height`.

#### --answer--

They do not share properties with inline or block-level elements.

### --question--

#### --text--

Which is TRUE about the `!important` keyword?

#### --distractors--

They are used to make comments for an important CSS property.

---

They make sure a CSS property has the correct syntax.

---

They make CSS rules easier to maintain.

#### --answer--

They override the specificity of other selectors.

### --question--

#### --text--

What character precedes a class selector name?

#### --distractors--

`#`

---

`$`

---

`*`

#### --answer--

`.`

### --question--

#### --text--

Which is FALSE about inline-level elements?

#### --distractors--

They take up only as much space as they need.

---

They do not start on a new line.

---

Common inline elements include `span` and `img`.

#### --answer--

They always start on a new line.

### --question--

#### --text--

Where are internal CSS styles accessed?

#### --distractors--

They are styles that are important to the project, so are not shared externally.

---

Since they form the core styling of the project, they are saved in the `styles.css` file so other web pages can access them.

---

They are stored inside the `body` element when there is only one web page to style.

#### --answer--

They are written within the `style` section within the `head` element.

### --question--

#### --text--

What is the order for applying the `padding` property when using the shorthand syntax?

#### --distractors--

`top`, `bottom`, `left`, `right`

---

`left`, `right`, `top`, `bottom`

---

`right`, `top`, `left`, `bottom`

#### --answer--

`top`, `right`, `bottom`, `left`

### --question--

#### --text--

What is the order for applying the `margin` property when using the shorthand syntax?

#### --distractors--

`left`, `right`, `top`, `bottom`

---

`right`, `top`, `left`, `bottom`

---

`top`, `bottom`, `left`, `right`

#### --answer--

`top`, `right`, `bottom`, `left`

### --question--

#### --text--

What are inline CSS styles used for?

#### --distractors--

They are used to style inline elements only.

---

They are used to style elements only when they all appear on the same line of the browser viewport.

---

They are used to resolve the issue with separation of concerns.

#### --answer--

They are used to directly style within the element, instead of using internal or external CSS.

### --question--

#### --text--

What symbol precedes the ID selector?

#### --distractors--

`.`

---

`*`

---

`$`

#### --answer--

`#`

---

### How Do You Space List Items Using margin or line-height?


---

### How Do the Different list-style Properties Work?


---

### Why Are Default Link Styles Important for Usability on the Web?


---

### How Do You Style the Different Link States?


---

### Build a Stylized To-Do list
In this lab, you will practice the different styles that can be applied to links when they are hovered over, focused, clicked, and visited.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have one unordered list with the class `todo-list`.
2. Inside the unordered list, you should have four list items.
3. Inside each list item, there should be:

   - An `input` element with the type `checkbox` and `id` set to a unique value.
   - A `label` element with the `for` attribute set to the corresponding `input` element's `id`.
   - An unordered list with the class `sub-item`.
   - A list item with an anchor element in it. The anchor should have the class `sub-item-link`, a valid `href` value, and a `target` value that makes the link open in a new tab.

4. Your `a` elements should not have any text decorations.
5. You should set the text color of unvisited links to a color of your choice.
6. When your links are visited, the color should change to another color of your choice.
7. When your links are hovered over, the color should change to another color of your choice.
8. When your links are focused, there should be a colored outline around the link.
9. When your links are clicked, the color should change to another color of your choice.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### How Do Background Image Size, Repeat, Position, and Attachment Work?


---

### What Is a Background Gradient, and How Does It Work?


---

### What Are Some Accessibility Considerations for Backgrounds?


---

### What Are the Different Ways You Can Add Borders Around Images?


---

### Design a Blog Post Card
In this lab, you'll practice how to style backgrounds and borders by creating a blog post card.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `div` element with a class of `blog-post-card` to hold all of your card elements.
2. Within the `.blog-post-card` element, you should have an image element with a valid `alt` attribute and text, and a class of `post-img`. You can use `https://cdn.freecodecamp.org/curriculum/labs/cover-photo.jpg` for the `src` attribute of the image.
3. You should have a `div` with a class of `post-content` within the `.blog-post-card` element with the following:
    - An `h2` element with a class of `post-title` and text for the title of your blog post.
    - A `p` element with a class of `post-excerpt` and text to summarize your blog post.
    - An `a` element with a class of `read-more` with the text `Read More`.
4. You should set the `body` element's background color to a value other than white.
5. You should apply the following styles to the `.blog-post-card` element:
    - A white background.
    - Rounded corners.
    - A width of your choice.
    - The text alignment of your choice.
6. The `.post-img` element should be styled so that the image fills the card's entire width and has a bottom border.
7. The `.post-content` element should be styled so that there is padding inside the card.
8. The `.post-title` and `.post-excerpt` elements should have a text color other than the default and margins on all sides.
9. The `.read-more` element should be styled like a button and have:
    - A text color other than the default.
    - A background color.
    - Margins on all sides.
    - Padding on all sides.
    - Rounded corners.
    - A `display` property set to `inline-block`.
    - A hover effect that changes its background color.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### Lists, Links, Background and Borders Review


---

### Lists, Links, Backgrounds and Borders Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

Which CSS property is used to specify the image to be used as a list item marker?

#### --distractors--

`list-style-position`

---

`background-image`

---

`content-image`

#### --answer--

`list-style-image`

### --question--

#### --text--

Which property is used to control the position of the list item marker?

#### --distractors--

`list-style-type`

---

`list-position`

---

`position-marker`

#### --answer--

`list-style-position`

### --question--

#### --text--

What does the `line-height` property do?

#### --distractors--

It is used to set the background size for an element.

---

It is used to style links that have not been visited by the user.

---

It is used to create space to the right of list items.

#### --answer--

It is used to create space between lines of text.

### --question--

#### --text--

Which pseudo-class is used to style links when a user hovers over them?

#### --distractors--

`:hovered`

---

`:hovering`

---

`:hasHovered`

#### --answer--

`:hover`

### --question--

#### --text--

What is the default value for the `background-repeat` property?

#### --distractors--

`no-repeat`

---

`repeat-x`

---

`space`

#### --answer--

`repeat`

### --question--

#### --text--

Which CSS property can be used to control the size of a background image?

#### --distractors--

`image-size`

---

`background-fit`

---

`size-image`

#### --answer--

`background-size`

### --question--

#### --text--

Which of the following is the correct way to apply a solid red top border to an element?

#### --distractors--

`set-top-border: 3px solid red;`

---

`border-top: apply 3px solid red;`

---

`top-border: 3px solid red;`

#### --answer--

`border-top: 3px solid red;`

### --question--

#### --text--

Which of the following is NOT a valid `border` property?

#### --distractors--

`border-bottom`

---

`border-right`

---

`border-top`

#### --answer--

`border-side`

### --question--

#### --text--

Which of the following is a valid `border-style` value?

#### --distractors--

`wave`

---

`triple`

---

`zig zag`

#### --answer--

`dotted`

### --question--

#### --text--

Which of the following is the correct way to apply borders using the shorthand property?

#### --distractors--

```css
.box {
  borders: 1px solid black;
}
```

---

```css
.box {
  borderShort: 1px solid black;
}
```

---

```css
.box {
  border-short: 1px solid black;
}
```

#### --answer--

```css
.box {
  border: 1px solid black;
}
```

### --question--

#### --text--

What is the role of the `linear-gradient` function?

#### --distractors--

It is used to set the style of an element's border.

---

It is used to determine how background images should be repeated along the horizontal and vertical axes.

---

It is used to style an element that was activated by the user.

#### --answer--

It is used to create a transition between multiple colors along a straight line.

### --question--

#### --text--

Which value for the `background-repeat` property ensures the image repeats horizontally but not vertically?

#### --distractors--

`repeat-y`

---

`space`

---

`no-repeat`

#### --answer--

`repeat-x`

### --question--

#### --text--

What is the purpose of the `border-radius` property?

#### --distractors--

To create shadows around the border.

---

To change the width of the border.

---

To make the border disappear.

#### --answer--

To round the corners of an element.

### --question--

#### --text--

Which of the following is NOT a valid value for the `background-position` property?

#### --distractors--

`top`

---

`center`

---

`bottom`

#### --answer--

`side`

### --question--

#### --text--

Which of the following `background-repeat` values can be used to repeat a background image vertically?

#### --distractors--

`repeat-x`

---

`vertical-only`

---

`stretch`

#### --answer--

`repeat-y`

### --question--

#### --text--

What does `background-position: center;` do to a background image?

#### --distractors--

It aligns the background image to the top of the element.

---

It repeats the background image horizontally and vertically.

---

It scales the background image to fill the entire element.

#### --answer--

It positions the background image in the center of the element.

### --question--

#### --text--

Which of these is NOT a valid `border` value?

#### --distractors--

`1px solid black`

---

`3px dotted blue`

---

`2px dashed red`

#### --answer--

`5px inverted green`

### --question--

#### --text--

What does the `radial-gradient` function do?

#### --distractors--

It creates a background that transitions between multiple colors along a straight line.

---

It specifies whether the background image should scroll with the content or remain fixed in place.

---

It is used to style an element that was activated by the user.

#### --answer--

It creates an image that radiates from a particular point and gradually transitions between multiple colors.

### --question--

#### --text--

Which of the following is NOT a valid pseudo-class?

#### --distractors--

`:focus`

---

`:visited`

---

`:link`

#### --answer--

`:before`

### --question--

#### --text--

Which of the following shows the `background` shorthand property being used properly?

#### --distractors--

```css
body {
  background: apply url("example-url-goes-here");
}
```

---

```css
body {
  background: set url("example-url-goes-here");
}
```

---

```css
body {
  background: 2px solid red url("example-url-goes-here");
}
```

#### --answer--

```css
body {
  background: no-repeat url("example-url-goes-here");
}
```

## --quiz--

### --question--

#### --text--

What kind of values can the `line-height` property accept?

#### --distractors--

Only pixel values

---

Only keyword values like `inherit`

---

Only em units

#### --answer--

Numbers, percentages, and length units

### --question--

#### --text--

Which of the following is not a valid value for `line-height`?

#### --distractors--

`normal`

---

`150%`

---

`2em`

#### --answer--

`bold`

### --question--

#### --text--

What does `list-style-type` control?

#### --distractors--

The position of a list marker

---

The spacing of list items

---

The alignment of list items

#### --answer--

The marker symbol used in a list

### --question--

#### --text--

Which value is not valid for `list-style-type`?

#### --distractors--

`circle`

---

`disc`

---

`square`

#### --answer--

`hexagon`

### --question--

#### --text--

What are the two acceptable values for `list-style-position`?

#### --distractors--

`top` and `bottom`

---

`inline` and `block`

---

`left` and `right`

#### --answer--

`inside` and `outside`

### --question--

#### --text--

Which CSS property adds spacing outside each list item to improve readability?

#### --distractors--

`padding`

---

`line-height`

---

`text-indent`

#### --answer--

`margin`

### --question--

#### --text--

What does the `:link` pseudo-class target?

#### --distractors--

All hyperlinks

---

Hovered links

---

Already visited links

#### --answer--

Unvisited links

### --question--

#### --text--

What pseudo-class styles a link that has already been visited by the user?

#### --distractors--

`:hover`

---

`:link`

---

`:focus`

#### --answer--

`:visited`

### --question--

#### --text--

Which pseudo-class styles an element when it gains input focus?

#### --distractors--

`:hover`

---

`:visited`

---

`:target`

#### --answer--

`:focus`

### --question--

#### --text--

When does the `:active` pseudo-class apply?

#### --distractors--

When the link is first loaded

---

When the user is not interacting

---

When the browser finishes rendering

#### --answer--

When a user clicks or taps the element

### --question--

#### --text--

Which pseudo-class is used for hover effects?

#### --distractors--

`:link`

---

`:click`

---

`:active`

#### --answer--

`:hover` 

### --question--

#### --text--

What does `background-size: cover` do?

#### --distractors--

Repeats the image in all directions

---

Crops the image

---

Fixes the image in one position

#### --answer--

Scales the image to fill the element while preserving aspect ratio

### --question--

#### --text--

Which value of `background-repeat` will repeat the background image both horizontally and vertically?

#### --distractors--

`no-repeat`

---

`repeat-x`

---

`space`

#### --answer--

`repeat`

### --question--

#### --text--

Which property sets where the background image is placed?

#### --distractors--

`background-location`

---

`background-origin`

---

`background-place`

#### --answer--

`background-position`

### --question--

#### --text--

What value of `background-attachment` keeps the image fixed when scrolling?

#### --distractors--

`scroll`

---

`static`

---

`sticky`

#### --answer--

`fixed`

### --question--

#### --text--

Which of the following correctly sets a background image that doesn’t repeat and is centered?

#### --distractors--

`background: no-repeat-center img("img.png");`

---

`background: image url("img.png") center;`

---

`background-position: center no-repeat url("img.png");`

#### --answer--

`background: center no-repeat url("img.png");`

### --question--

#### --text--

Which property is used to set the top, right, bottom, and left borders in a single declaration?

#### --distractors--

`border-style`

---

`border-radius`

---

`outline`

#### --answer--

`border`

### --question--

#### --text--

What effect does setting `border-radius: 10px;` have on an element?

#### --distractors--

It changes the border's opacity

---

It creates a 10-pixel border

---

It adds a 10px shadow

#### --answer--

It rounds the corners of the element

### --question--

#### --text--

Which of the following CSS rules correctly creates a linear gradient from red to yellow?

#### --distractors--

`background: gradient-linear(red to yellow);`

---

`background: linear(red, yellow);`

---

`background-color: gradient(red, yellow);`

#### --answer--

`background: linear-gradient(red, yellow);`

### --question--

#### --text--

Which of the following CSS declarations correctly applies a radial gradient from white in the center to blue at the edges?

#### --distractors--

`background: linear-gradient(white to blue);`

---

`background: gradient-radial(white to blue);`

---

`background: radial-gradient(blue, white);`

#### --answer--

`background: radial-gradient(white, blue);`

---

## design-for-developers

### What Are Common Design Terms to Help You Communicate with Designers?


---

### How Do You Create Good Background and Foreground Contrast in Your Designs?


---

### What Is the Importance of Good Visual Hierarchy in Design?


---

### How Does Scale Work in Design?


---

### How Does Alignment Work in Design?


---

### What Is the Importance of Whitespace in Design?
## What Is White Space?

White space refers to any type of space around elements like images, text, and buttons. White space is important in design because it helps to create a balance between the elements on the page.

Let's take a look at some examples of how white space can be used effectively in design.

## Enhancing CTAs

Let's consider a call-to-action (CTA) button. CTAs are used to encourage users to take a specific action like signing up for a newsletter or making a purchase.

On the freeCodeCamp homepage, the CTA button is visually separated from other elements. The image below shows this button, with a certain amount of space around it.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-is-the-importance-of-whitespace-in-design-1.png" alt="Call-to-action button on the freeCodeCamp homepage with yellow background and black text reading: Get started (it's free). The button is centered on its own line with ample white space above and below.">

By using white space effectively, we can help to make a CTA button more prominent and encourage users to click on it.

## Types of White Space

Now let's take a closer look at the different types of white space.

- **Macro** white space is the space between larger elements like images, text blocks, and buttons.
- **Active** white space is the space that is intentionally created to help guide the user's eye and draw attention to certain elements on the page.
- **Passive** white space is the space that is left over after all the elements on a page have been placed.
- **Micro** white space is the space between individual characters in a line of text.

The image below shows the Frequently Asked Questions section on the freeCodeCamp homepage, where this spacing allows you to read each question and answer easily.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-is-the-importance-of-whitespace-in-design-2.png" alt="The Frequently Asked Questions section on the freeCodeCamp homepage, with text spaced sufficiently between each letter.">

Micro white space is important because it helps to improve readability and legibility, making it easier for users to scan and understand the content.

## The Law of Proximity

When designing your web pages, you always want to be mindful of the law of proximity. This law states that elements that are close together are perceived as being related, while elements that are far apart are perceived as being unrelated.

You can use white space to help group related elements together and help navigate users through the content on your page.

# --questions--

## --text--

What is macro white space?

## --answers--

The space between individual characters in a line of text.

### --feedback--

Think about space seen around larger elements.

---

The space around images only.

### --feedback--

Think about space seen around larger elements.

---

The space around text only.

### --feedback--

Think about space seen around larger elements.

---

The space between larger elements like images, text blocks and buttons.

## --video-solution--

4

## --text--

What is active white space?

## --answers--

Space that is only for text elements on a page.

### --feedback--

Think about the purpose of active white space.

---

Space that is for figure elements on a page.

### --feedback--

Think about the purpose of active white space.

---

Space that is for list items on a page.

### --feedback--

Think about the purpose of active white space.

---

Space that is intentionally created to help guide the user's eye and draw attention to certain elements on the page.

## --video-solution--

4

## --text--

What is passive white space?

## --answers--

Space that is left over after all the elements on a page have been placed.

---

Space that is only for text elements on a page.

### --feedback--

Think about how this space contrasts to active white space.

---

Space that is for image elements on a page.

### --feedback--

Think about how this space contrasts to active white space.

---

Space that is for nav elements on a page.

### --feedback--

Think about how this space contrasts to active white space.

## --video-solution--

1

---

### What Are Best Practices for Working with Images in Your Designs?


---

### What Is Progressive Enhancement?
Progressive enhancement is a design approach that ensures all users, regardless of browser or device, can access the essential content and functionality of an application. 

It focuses on delivering a core experience that works for everyone, while offering extra features and improvements to users with more advanced browsers or better internet connections.

The progressive enhancement approach lives by these core principles:

- All core content and basic functionality should be accessible on all browsers
- All advanced layouts should be provided through external CSS stylesheets
- All advanced functionality should be provided through external JavaScript files
- A user's browser preferences should be respected

Using a progressive enhancement approach makes your applications more accessible because all core content and functionality should not be blocked in unsupported environments. 

In terms of speed, a progressive enhancement approach can also help improve the performance of your applications. 

Those users that are working with slower internet connection speeds will still be able to access the content because the browser will download the necessary resources first.

When it comes to SEO, progressive enhancement can also help improve the visibility of your applications. 

Search engines will be able to crawl the content of your applications because the core content is available in the initial HTML response.

While some have criticized this approach deeming that it is not always realistic for applications that rely heavily on JavaScript for their functionality, it is still a good practice to follow when building applications.

# --questions--

## --text--

What is the main goal of progressive enhancement?

## --answers--

To ensure that the application is heavily reliant on JavaScript.

### --feedback--

Think about accessible content for all users.

---

To ensure all users, regardless of browser or device, can access the essential content and functionality of an application.

---

To ensure that the latest complex features are available to all users.

### --feedback--

Think about accessible content for all users.

---

To ensure that the application is only available to users with the latest browsers.

### --feedback--

Think about accessible content for all users.

## --video-solution--

2

## --text--

Which of the following is NOT a core principle of progressive enhancement?

## --answers--

A user's browser preferences should be respected.

### --feedback--

Think about which option does not respect the user's preferences.

---

All advanced layouts should be provided through external CSS stylesheets.

### --feedback--

Think about which option does not respect the user's preferences.

---

A user's browser preferences should be ignored.

---

All advanced functionality should be provided through external JavaScript files.

### --feedback--

Think about which option does not respect the user's preferences.

## --video-solution--

3

## --text--

What is a common criticism of the progressive enhancement approach?

## --answers--

It is not always realistic for applications that rely heavily on JavaScript for their functionality.

---

It can result in a less engaging user experience on modern devices due to its focus on backward compatibility.

### --feedback--

Think about the limitations of the approach and the amount of resources needed.

---

It leads to bloated web pages with excessive code and resources that are not needed by modern browsers.

### --feedback--

Think about the limitations of the approach and the amount of resources needed.

---

It requires extensive browser testing on older, less capable browsers, which can be time-consuming and expensive.

### --feedback--

Think about the limitations of the approach and the amount of resources needed.

## --video-solution--

1

---

### What Is User-Centered Design?
User-centered design is a web development approach that prioritizes the end user, from their needs to their preferences and limitations. The goal of user-centered design is to craft a web page that is intuitive, efficient to use, and pleasing for your users to interact with.

One of the first aspects of user-centered design is considering your target demographics. For example, if your intended user-base is younger, you might leverage more flashy eye-catching designs that grab their attention immediately. For an older audience, you might focus more on clear and streamlined designs without distractions.

Another aspect to consider is the goal of your end users. For example, if you're building an e-commerce page for your products, you probably don't want to advertise someone else's products on your page. But if you're building a personal blog, you might include advertisement elements to generate revenue from passive readers.

User behavior is an important factor as well. You'll want to leverage an analytics tool, like Google Analytics, to measure how your users engage with your pages. This can reveal areas where users might be getting "stuck" and leaving your page, or opportunities to improve the overall interaction flow.

A key to user-centered design is to actually involve your users. Providing a feedback channel where they can share their experiences and pain points with your site allows you to capture vital information and iterate further to improve. Ultimately, user-centered design means you need to put the user at the forefront of your decision making, whether that's through research or direct feedback.

# --questions--

## --text--

What is the main goal of user-centered design?

## --answers--

To make the website visually appealing.

### --feedback--

User-centered design means focusing on the user.

---

To prioritize the developer's preferences.

### --feedback--

User-centered design means focusing on the user.

---

To create a website that is intuitive and efficient for users.

---

To reduce development costs.

### --feedback--

User-centered design means focusing on the user.

## --video-solution--

3

## --text--

Why is it important to consider target demographics in user-centered design?

## --answers--

To determine the website's color scheme.

### --feedback--

The demographics of your audience might influence the design.

---

To choose appropriate design elements for the intended audience.

---

To decide on the website's content.

### --feedback--

The demographics of your audience might influence the design.

---

To set the price of products or services.

### --feedback--

The demographics of your audience might influence the design.

## --video-solution--

2

## --text--

What is one way to gather information about user behavior on your website?

## --answers--

Conduct in-person interviews.

### --feedback--

Automated measurements of user interactions provide a broad and unbiased data set.

---

Use social media polls.

### --feedback--

Automated measurements of user interactions provide a broad and unbiased data set.

---

Implement analytics tools like Google Analytics.

---

Ask friends and family for opinions.

### --feedback--

Automated measurements of user interactions provide a broad and unbiased data set.

## --video-solution--

3

---

### What Are User Requirements, User Research, and Testing?
User research is the systematic study of the people who use your product. The goal is to measure user needs, behaviors, and pain points.

User research comes in many forms. Perhaps one of the most common is the Net Promoter Score, or NPS. The NPS measures how likely your users are to recommend your product to a friend. NPS is measured through a survey offered at key milestones along the user's journey, such as after 7 days, 30 days, and 90 days. NPS is measured on a scale of 0 to 10, with 9 and 10 indicating an active promoter of your site.

Another research vector is an exit interview. This is a survey you show to your users when they cancel a subscription or delete an account. Data from this survey can give you insight into the factors causing user churn, so you can address them.

User testing, on the other hand, refers to the practice of capturing data from users as they interface with your application. For example, a video game going through beta testing is a form of user testing. One you might run into as a web developer is A/B testing. A/B testing involves shipping a new feature to a randomly selected subset of your user base. You can then leverage analytics data to determine if the feature is beneficial.

Finally, user requirements refer to the stories or rubric that your application needs to follow. This can inform the development process. User requirements might be defined by user research, or industry standards. They can even be defined by stakeholder input.

These requirements may be functional, meaning they dictate how your application should work, or non-functional, meaning they define how your application should behave. User requirements are not static, either. The information from both user testing and user research can impact the requirements, and they will change as your user base changes.

Understanding the difference is essential for collecting the most accurate data so you can deliver the best experience for your end users. 

# --questions--

## --text--

What is the primary purpose of user research?

## --answers--

To increase sales of a product.

### --feedback--

User research involves studying the people who use your product.

---

To measure user needs, behaviors, and pain points.

---

To develop new features for an application.

### --feedback--

User research involves studying the people who use your product.

---

To conduct A/B testing on a website.

### --feedback--

User research involves studying the people who use your product.

## --video-solution--

2

## --text--

Which of the following is NOT a typical method of user research or testing?

## --answers--

Net Promoter Score (NPS).

### --feedback--

The lesson discusses several methods, but one common research method is not explicitly mentioned.

---

Exit interviews.

### --feedback--

The lesson discusses several methods, but one common research method is not explicitly mentioned.

---

A/B testing.

### --feedback--

The lesson discusses several methods, but one common research method is not explicitly mentioned.

---

Version Control.

## --video-solution--

4

## --text--

What is the difference between functional and non-functional user requirements?

## --answers--

Functional requirements are important, while non-functional requirements are optional.

### --feedback--

The lesson mentions that requirements can be categorized into two types based on what they dictate about the application.

---

Functional requirements define how the application should work, while non-functional requirements define how it should behave.

---

Functional requirements are set by stakeholders, while non-functional requirements come from user research.

### --feedback--

The lesson mentions that requirements can be categorized into two types based on what they dictate about the application.

---

Functional requirements are static, while non-functional requirements change over time.

### --feedback--

The lesson mentions that requirements can be categorized into two types based on what they dictate about the application.

## --video-solution--

2

---

### What Are Best Practices for Designing a Dark Mode Feature?


---

### What Are Best Practices for Designing Breadcrumbs?


---

### What Are Best Practices for Designing Cards?


---

### What Are Best Practices for Designing Infinite Scrolls?


---

### What Are Best Practices for Designing Modal Dialogs?


---

### What Are Best Practices for Progress Indication on Forms, Registration, and Setup?


---

### What Are Best Practices for Designing Shopping Carts?


---

### What Is Progressive Disclosure?


---

### What Is Deferred and Lazy Registration?
Lazy registration is a UI design pattern that allows users to browse and interact with your application without having to register. A good example of this would be an e-commerce site. Users should be able to browse through the products and add a few items to their cart. Then, if they are interested in purchasing, they will need to register.

The reason is that users need to see the value your site offers before they are willing to provide their information and register. When designing your applications, users should be able to see the value and feel like the application is safe to provide their information. Otherwise, they will not be willing to register and you will lose potential customers.

You will need to make sure to communicate that the user's sensitive data will be protected and secure. In later modules, we will discuss how to secure your application and protect your user's data.

Another good example of lazy registration would be YouTube. YouTube is a video sharing platform with millions of videos on everything from tech, pop culture, and gaming. If you visit YouTube, users can watch as many videos as they like without needing to sign in or register. However, if they want to like, comment, or subscribe to a channel, they will need to register.

If the user likes the content they are watching or wants to participate in the conversations, then they will be more willing to register. Lazy registration is a useful design pattern that allows users to see the value of your application before they are willing to provide their information.

The next time you are designing an application, consider using lazy registration to increase user engagement and retention.

# --questions--

## --text--

How does lazy registration impact user interaction with an application?

## --answers--

It immediately limits user access until they complete a registration form.

### --feedback--

The goal is to let users experience the application first.

---

It encourages users to engage with content before asking for their registration details.

---

It requires users to provide payment information before accessing any features.

### --feedback--

The goal is to let users experience the application first.

---

It makes the registration process mandatory before users can view any part of the application.

### --feedback--

The goal is to let users experience the application first.

## --video-solution--

2

## --text--

What is one of the main benefits of lazy registration in UI design?

## --answers--

Users can immediately make purchases without registering.

### --feedback--

Think about the value proposition of the application.

---

Users can see the value of the application before deciding to register.

---

Users are required to register to view any content.

### --feedback--

Think about the value proposition of the application.

---

Users can bypass all security protocols during registration.

### --feedback--

Think about the value proposition of the application.

## --video-solution--

2

## --text--

Which of the following is an example of a platform that uses lazy registration?

## --answers--

A banking app requiring users to register before browsing financial products.

### --feedback--

This platform allows users to access most of its features without needing to register immediately.

---

An e-commerce site allowing users to browse products and add items to a cart before registering.

---

An email service that asks users to register before reading any emails.

### --feedback--

This platform allows users to access most of its features without needing to register immediately.

---

A health app that requires registration to access general health tips.

### --feedback--

This platform allows users to access most of its features without needing to register immediately.

## --video-solution--

2

---

### What Are Design Briefs and How Do Developers Work with Them?
When it comes to designing new features or applications, a good first step would be to create a design brief.

A design brief is a document that outlines the objectives, goals, and requirements of a project. It is a roadmap that guides the design process and ensures that the final product meets the needs of the client.

Usually the client will write the design brief and it will serve as a working draft. Sometimes, the designer might write one and consult with the client to make sure it meets their needs.

There are a few key elements that should be included in a design brief.

The first element is the overview of the project and business. This overview should include the company's details, mission, values, unique selling points, and products or services.

The next key element should be to document the goals and objectives for the project. This should include the purpose of the project, and the desired outcomes.

Examples of goals include increasing traffic to a site or increasing the number of monthly page visits by X percent.

Another key element would be the target audience. The design brief should include information about the target demographics, interests, and needs of the audience.

You should also include information about the competition and how the project will differentiate itself from the competition.

Another key element would be the project scope. This should include the deliverables, timeline, and budget. The deliverables should include a list of all the items that will be produced as part of the project, such as mockups, and final designs.

Without clearly defining project scope, things can get out of hand and go over budget. So, it's best to be as detailed as possible about what is expected to be delivered and by when.

One of the challenging aspects about project design is the timescale and budget. It is important to be realistic about what can be achieved within the given timeframe and budget. So, having a design brief that outlines these constraints is important.

Once all of these details have been discussed and documented, the design brief should be reviewed and approved by all stakeholders before the project begins. At that point, the designers can get started with their work.

So, what is the developer's role in all of this? The developer's role is to take the designs, understand the project requirements, and turn them into a working product.

This involves writing code, testing, and debugging the application to ensure that it meets the requirements outlined in the design brief.

Oftentimes, developers will work in teams where the work is split up between multiple developers.

There will also usually be a project manager who will be responsible for coordinating the work and making sure that the project stays on track.

So, while you might not be involved in the design and initial decision-making process as a developer, it is still important to understand the design brief and how it will impact your work.

# --questions--

## --text--

What is a design brief?

## --answers--

A timeline of past project milestones.

### --feedback--

Think about goals and objectives of a project.

---

A schedule of meetings and deadlines for a project team.

### --feedback--

Think about goals and objectives of a project.

---

A manual on how to use specific software tools.

### --feedback--

Think about goals and objectives of a project.

---

A document that outlines the objectives, goals, and requirements of a project.

## --video-solution--

4

## --text--

Why is it important to define the scope for a project in a design brief?

## --answers--

To plan the project's social media marketing strategy.

### --feedback--

Think about budget and timeline.

---

To ensure that the project stays on track and within budget.

---

To select the software tools for team collaboration.

### --feedback--

Think about budget and timeline.

---

To choose the best color palette for the project.

### --feedback--

Think about budget and timeline.

## --video-solution--

2

## --text--

What is the role of the developer in a project?

## --answers--

To change the timeline and deliverables in the design brief.

### --feedback--

Remember that the developer should not go against what was agreed upon in the design brief.

---

To take the design brief and turn it into a working product.

---

To change the design brief to meet the developer's preferences.

### --feedback--

Remember that the developer should not go against what was agreed upon in the design brief.

---

To change the project scope to include more features.

### --feedback--

Remember that the developer should not go against what was agreed upon in the design brief.

## --video-solution--

2

---

### What Are Some Common Tools Developers Should Know About That Are Used by Designers in the Industry?
Design is the foundation of every enterprise-level web application. That's why designers and developers work closely to create user-focused interfaces that are visually appealing and functional.

Because of this, developers should be familiar with common design tools to make the most of what designers offer. Most of these design tools excel in vector-based design and prototyping.

Vector-based design involves creating digital art using mathematical formulas to define lines, shapes, and colors. Prototyping, on the other hand, refers to the process of creating an interactive model of a product or user interface.

Let's talk about some common design tools developers should know about.

Figma is one of the most common and essential design tools that developers should know. This cloud-based tool specializes in User Interface and User Experience (UI/UX) design. It enables design and development teams to collaborate from anywhere, offering built-in features such as:

- Vector-based design
- Automatic layout
- Commenting and feedback system
- Version history
- Real-time collaboration
- Design systems, and more.

To get started with Figma, you can use the web-based interface or download the desktop app for your computer. It has a generous free tier, so you can get a lot done without paying for the pro version.

Sketch is another essential design tool that developers should be familiar with. Like Figma, it is vector-based and primarily used for UI/UX design.

Sketch is popular for its intuitive interface and simplicity, making it ideal for developers who want to quickly create prototypes. It's also widely used by designers for tasks like creating UIs, icons, and web layouts.

The main constraints with Sketch are its lack of a cloud-based interface and its availability only on macOS.

Adobe XD is another vector-based design and prototyping tool for UI/UX design, known for its seamless integration with other Adobe apps like Photoshop, Illustrator, and After Effects.

This integration makes workflows such as interactive prototyping and animations more efficient.

Adobe XD is available for both Windows and macOS and includes a cloud-based interface. For the best experience, however, you should use the app directly.

Another design tool worth mentioning is Canva. You can use Canva to create a wide range of visual content, including posters, cover photos, presentations, short videos, and more. Its user-friendly and simple design makes it ideal for beginners.

Additionally, Canva offers a rich library of templates, images, and design elements that make it easy to create professional-looking designs.

Beyond these features, Canva supports web interface design and allows for collaboration with teammates. The platform is available on the web, desktop, Android, and iOS app.

Other popular design tools developers should know are Framer, InVision, Adobe Photoshop, Adobe Illustrator, and Miro.

# --questions--

## --text--

Which of these best describes Sketch?

## --answers--

It is difficult to learn and use.

### --feedback--

Think about what makes a design tool efficient for both developers and designers.

---

It is primarily used for back-end development.

### --feedback--

Think about what makes a design tool efficient for both developers and designers.

---

It is known for its intuitive interface and simplicity, ideal for quick prototypes.

---

It is rarely used for creating UIs or web layouts.

### --feedback--

Think about what makes a design tool efficient for both developers and designers.

## --video-solution--

3

## --text--

Which of these is not a feature of Figma?

## --answers--

Vector-based design.

### --feedback--

Consider the primary focus of Figma as a design tool.

---

Automatic layout.

### --feedback--

Consider the primary focus of Figma as a design tool.

---

Real-time collaboration.

### --feedback--

Consider the primary focus of Figma as a design tool.

---

Coding environment.

## --video-solution--

4

## --text--

What is Adobe XD known for?

## --answers--

Complex video editing features.

### --feedback--

Consider Adobe XD's primary use in UI/UX design and its relationship with other Adobe tools.

---

Seamless integration with other Adobe apps like Photoshop and Illustrator.

---

Being a raster-based image editor.

### --feedback--

Consider Adobe XD's primary use in UI/UX design and its relationship with other Adobe tools.

---

Specialized 3D modeling capabilities.

### --feedback--

Consider Adobe XD's primary use in UI/UX design and its relationship with other Adobe tools.

## --video-solution--

2

---

### Design Fundamentals Review
## Design Terminology

- **Layout**: This is how visual elements are arranged on a page or screen to communicate a message. These elements may include text, images, and white space.
- **Alignment**: This is how the elements are placed in relation to one another. Using alignment correctly is helpful for making the design look clean and organized.
- **Composition**: This is the act of arranging elements to create a harmonious design. It determines how elements like images, text, and shapes relate to each other and contribute to the design in an artistic way.
- **Balance**: This is how visual weight is distributed within a composition. Designers aim to create an equilibrium through symmetrical or asymmetrical arrangements.
- **Scale**: This refers to comparing the dimensions or size of one element to that of another.
- **Hierarchy**: This establishes the order of importance of the elements in a design. It's about making sure that the most important information is noticed first. 
- **Contrast**: This is the process of creating clear distinctions between the elements. You can do this through variations in color, size, shape, texture, or any other visual characteristic. Strong contrast is also helpful for improving readability.
- **White Space (negative space)**: This is the empty space in a design. It's the area surrounding the elements.
- **UI (User Interface)**: UI includes the visual and interactive elements that users can see on their screens, like icons, images, text, menus, links, and buttons.
- **UX (User Experience)**: UX is about how users feel when using a product or service. An application with a well-designed user experience is intuitive, easy to use, efficient, accessible, and enjoyable.
- **Design Brief**: This is a document that outlines the objectives, goals, and requirements of a project. It is a roadmap that guides the design process and ensures that the final product meets the needs of the client.
- **Vector Based Design**: This involves creating digital art using mathematical formulas to define lines, shapes, and colors.
- **Prototyping**: This refers to the process of creating an interactive model of a product or user interface.

## UI Design Fundamentals

- **Good Contrast for Background and Foreground Colors**: It is important to ensure that the background and foreground colors have good contrast to make the text readable. The Web Content Accessibility Guidelines (WCAG) recommend a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
- **Good Visual Hierarchy in Design**: A strong visual hierarchy can provide a clear path for the eye to follow, ensuring that the information you convey is consumed in the order that you intend.
- **Responsive Images**: Responsive images are images that scale to fit the size of the screen they are being viewed on. This is important because it ensures that your images look good on all devices, from desktops to mobile phones.
- **Progressive Enhancement**: This is a design approach that ensures all users, regardless of browser or device, can access the essential content and functionality of an application. 
- **User-centered Design**: This is an approach that prioritizes the end user, from their needs to their preferences and limitations. The goal of user-centered design is to craft a web page that is intuitive, efficient to use, and pleasing for your users to interact with.
- **User Research**: This is the systematic study of the people who use your product. The goal is to measure user needs, behaviors, and pain points.
- **Exit Interviews**: This is a survey you can give to users when they cancel their accounts. It can help you understand why users are leaving and what you can do to reduce churn.
- **User Testing**: This refers to the practice of capturing data from users as they interface with your application.
- **A/B Testing**: This is the process of shipping a new feature to a randomly selected subset of your user base. You can then leverage analytics data to determine if the feature is beneficial.
- **User Requirements**: This refers to the stories or rubric that your application needs to follow. User requirements might be defined by user research or industry standards. They can even be defined by stakeholder input.
- **Progressive Disclosure**: This is a design pattern used to only show users relevant content based on their current activity and hide the rest. This is done to reduce cognitive load and make the user experience more intuitive.
- **Deferred/Lazy Registration**: This is a UI design pattern that allows users to browse and interact with your application without having to register.

## Design Best Practices

- **Dark Mode**: This is a special feature on web applications where you can change the default light color scheme to a dark color scheme. You should use desaturated colors in dark mode. Desaturated colors are colors that are less intense and have a lower saturation level.
- **Breadcrumbs**: This is a navigation aid that shows the user where they are in the site's hierarchy. It is best to place breadcrumbs at the top of the page so users can easily find it. Also, you want to make sure the breadcrumbs are large enough to be easily read, but not so large that they take up too much space on the page.
- **Card Component**: Your card component should be simple in design, not visually cluttered or display too much information. For media, make sure to choose high-quality images and videos to enhance the user experience.
- **Infinite Scroll**: This is a design pattern that loads more content as the user scrolls down the page. You should consider using a load more button because it gives a user control over when they want to see more content. You can also add a back button so users have the ability to go back to the previous page without having to scroll all the way back up. 
- **Modal Dialog**: This is a type of pop-up that will display on top of existing page content. Usually the background content will have a dim color overlay in order to help the user better focus on the modal content. Also, it is always a good idea to allow the user to click outside of the modal to close it. When you use the HTML `dialog` element, you will get a lot of the functionality and accessibility benefits built in.
- **Progress Indication for Form Registration**: This is a way to show users how far they are in a process. It can be used in forms, registration, and setup processes. Your design should be simple, easy to find, and make it possible to go back to previous steps.
- **Shopping Cart**: Carts are a place for user to see what item they have already selected on an e-commerce platform. Your carts should always be visible to the user, use a common icon like a cart, bag or basket, and have a clear call-to-action button for users to proceed to checkout.

## Common Design Tools

- **Figma**: This cloud-based tool specializes in User Interface and User Experience (UI / UX) design. It enables design and development teams to collaborate from anywhere, offering built-in features including Vector-based design, automatic layout, a commenting and feedback system and more.
- **Sketch**: This is a popular design tool used for its intuitive interface and simplicity, making it ideal for developers who want to quickly create prototypes. It's also widely used by designers for tasks like creating UIs, icons, and web layouts.
- **Adobe XD**: This is a vector-based design and prototyping tool for UI/UX design, known for its seamless integration with other Adobe apps like Photoshop, Illustrator, and After Effects.
- **Canva**: This tool allows you to create a wide range of visual content, including posters, cover photos, presentations, short videos, and more. Its user-friendly and simple design makes it ideal for beginners.

# --assignment--

Review the Design Fundamentals topics and concepts.

---

### Design Fundamentals Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What are some reasons why whitespace is important for good design?

#### --distractors--

Improves readability by placing many elements on the page.

---

Focuses the viewer's attention by having elements placed close together.

---

Creates breathing space in the design to make users scroll for more information.

#### --answer--

Creates visual hierarchy, improves readability, focuses the viewer's attention on different elements.

### --question--

#### --text--

What is the design principle of carefully choosing the size of elements in relation to each other?

#### --distractors--

Visual hierarchy.

---

Proportion

---

Balance

#### --answer--

Scale

### --question--

#### --text--

Which of the following sites would most likely benefit from using breadcrumbs?

#### --distractors--

A single-page portfolio site.

---

An infinite scroll gallery site.

---

A simple blog with only a few posts.

#### --answer--

A complex e-commerce site with multiple categories and subcategories.

### --question--

#### --text--

Which design pattern allows users to access and interact with elements and content on a website without requiring immediate registration?

#### --distractors--

Captcha validation.

---

Lazy loading.

---

Progressive enhancement.

#### --answer--

Deferred/lazy registration.

### --question--

#### --text--

What are three types of text alignment?

#### --distractors--

Top, center, horizontal.

---

Left, right, middle.

---

Vertical, horizontal, equal.

#### --answer--

Left, right, center.

### --question--

#### --text--

Which interaction design pattern reduces the complexity of interaction by hiding parts of interfaces progressively so that content is only introduced to the user as they progress through the application?

#### --distractors--

Extended discoverability.

---

Delayed implementation.

---

Gradual engagement.

#### --answer--

Progressive disclosure.

### --question--

#### --text--

What is contrast in design?

#### --distractors--

Elements that are visually similar.

---

The difference in saturation between two colors.

---

Matching elements on a page.

#### --answer--

Elements that are strikingly different from each other visually.

### --question--

#### --text--

Which of the following is an example of visual hierarchy in design?

#### --distractors--

Headline and title text are a similar color to the background and other elements to blend in.

---

Text and images are all the same size on the page.

---

The logo banner is smaller than all the minor images on the main landing page.

#### --answer--

Making the headline of the page larger than other text that comprise the body or sub-headings

### --question--

#### --text--

What is a common goal of conducting exit interviews in user research?

#### --distractors--

To increase the number of new users.

---

To test new features with existing users.

---

To gather data for A/B testing.

#### --answer--

To understand the factors causing user churn.

### --question--

#### --text--

What is user centered design?

#### --distractors--

A design process where once the design is completed, designers test the product by getting user feedback.

---

A design process where designers consider user accessibility requirements.

---

A design process focused on client requirements at every stage of the process.

#### --answer--

An iterative design process where designers design a product considering user requirements at every stage of the process.

### --question--

#### --text--

What is the minimum required contrast ratio for regular text for accessibility according to WCAG guidelines?

#### --distractors--

1:1

---

7:1

---

3:1

#### --answer--

4.5:1

### --question--

#### --text--

What are some colors to consider when designing dark mode?

#### --distractors--

Pure white.

---

Highly saturated colors.

---

Bright highly contrasting colors.

#### --answer--

Dark colors and muted light colors for contrast in dim lighting conditions.

### --question--

#### --text--

How can user research impact user requirements?

#### --distractors--

It has no impact on user requirements.

---

It only affects non-functional requirements.

---

It only affects functional requirements.

#### --answer--

It can help define and refine user requirements based on user feedback.

### --question--

#### --text--

Why is it important for a design brief to be reviewed and approved by all stakeholders before the project begins?

#### --distractors--

To ensure everyone is aware of the project's social media strategy.

---

To finalize the color palette and design elements.

---

To determine the project's marketing budget.

#### --answer--

To confirm that all stakeholders agree on the project's objectives and requirements.

### --question--

#### --text--

What is considered bad practice when implementing infinite scroll?

#### --distractors--

Allowing users to jump to a page or section through the navbar or a pagination drop down menu.

---

Adding a load more indicator or symbol after a certain point in the page along with the infinite scroll.

---

Integrating a footer reveal at the bottom.

#### --answer--

Not adding alternative methods of navigating the page.

### --question--

#### --text--

Which of the following is a best practice when designing progress indicators for forms?

#### --distractors--

Requiring users to restart the form if they navigate away from the page.

---

Keeping the progress indicator small and discreet.

---

Making sure the progress is just displayed visually without any text.

#### --answer--

Breaking the progress indicator into labeled sections.

### --question--

#### --text--

What is one way to make shopping cart design intuitive and user friendly?

#### --distractors--

Use a new shopping cart icon that no other website has used before.

---

Do not allow users to add or remove items from the cart.

---

Automatically add products to the cart without user interaction.

#### --answer--

Include thumbnail images of products in the cart.

### --question--

#### --text--

Dark mode doesn't mean pure black. What is a good technique to create an effective dark mode color scheme?

#### --distractors--

Make images and elements darker and reduce contrast between different elements to have them blend in.

---

Invert the color scheme.

---

Use many saturated colors.

#### --answer--

Use dark gray or a dark shade of the brand color instead of pure black.

### --question--

#### --text--

What is one good design practice when creating modals?

#### --distractors--

Put a lot of important information inside a modal.

---

Have multiple modals on the same screen.

---

Ensure the modal draws the user's attention away from it.

#### --answer--

Make the modal dismiss icon visible.

### --question--

#### --text--

What is a design brief?

#### --distractors--

A document outlining the programming and design standards of the project.

---

A document explaining how to replicate a design.

---

A document with detailed information of icons, colors, and assets the designer should use.

#### --answer--

A document stating the goals and project scope, budget and design requirements.

## --quiz--

### --question--

#### --text--

Which design tool is especially known for real-time collaboration in the cloud?

#### --distractors--

Adobe XD

---

Sketch

---

Canva

#### --answer--

Figma

### --question--

#### --text--

Which tool is most suitable for beginners creating posters and presentations?

#### --distractors--

Sketch

---

Figma

---

Adobe XD

#### --answer--

Canva

### --question--

#### --text--

Why should breadcrumbs be designed to be easily readable but not oversized?

#### --distractors--

To match the font size of main headers.

---

To keep them consistent across all screen sizes.

---

To make them blend into the background.

#### --answer--

To balance visibility without overwhelming the page layout.

### --question--

#### --text--

What is a common mistake to avoid in card component design?

#### --distractors--

Keeping the card visually simple.

---

Adding hover animations for feedback.

---

Using white space effectively.

#### --answer--

Displaying too much information at once.

### --question--

#### --text--

What usability issue can arise with infinite scroll without a "back" option?

#### --distractors--

Users may load duplicate content.

---

Users may scroll too fast.

---

Users may exit the app accidentally.

#### --answer--

Users may lose their original context.

### --question--

#### --text--

Which of the following helps visually distinguish a modal from the page content behind it?

#### --distractors--

Adding a shadow to modal buttons.

---

Animating the modal with a fade-in effect.

---

Increasing modal font size significantly.

#### --answer--

Using a dim overlay on the background content.

### --question--

#### --text--

Why should a progress indicator in a registration form support backward navigation?

#### --distractors--

It reduces loading time.

---

It makes the form look shorter.

---

It avoids page refreshes.

#### --answer--

It improves usability.

### --question--

#### --text--

When using progressive enhancement, what's the primary benefit for users on older devices or browsers?

#### --distractors--

They get alerted to upgrade their browser.

---

They are redirected to mobile-optimized sites.

---

They see a basic version of animations.

#### --answer--

They can still access essential content and features.

### --question--

#### --text--

Why might deferred (lazy) registration improve conversion rates?

#### --distractors--

It reduces back-end authentication load.

---

It hides premium features.

---

It requires fewer third-party integrations.

#### --answer--

It lets users explore value before committing.

### --question--

#### --text--

What does a good responsive image setup accomplish on mobile devices?

#### --distractors--

It reduces color depth for performance.

---

It triggers a mobile-only animation.

---

It stretches images to fill available space.

#### --answer--

It adapts image size without losing quality.

### --question--

#### --text--

What is the purpose of establishing a strong visual hierarchy in UI design?

#### --distractors--

It ensures animations run smoothly on low-end devices.

---

It helps with color contrast and branding.

---

It reduces the need for progressive disclosure.

#### --answer--

It guides the user's eye through information in the intended order.

### --question--

#### --text--

Why is contrast more than just choosing black text on white?

#### --distractors--

It's about matching brand fonts.

---

It's mainly about marketing visibility.

---

Contrast ensures pixel-perfect accuracy.

#### --answer--

Contrast must work across all lighting conditions and devices.

### --question--

#### --text--

Why is user testing critical when refining an interface design?

#### --distractors--

It determines how well colors follow contrast ratio guidelines.

---

It helps finalize stakeholder preferences.

---

It reduces the time spent on writing design briefs.

#### --answer--

It reveals how users interact with the interface in practice.

### --question--

#### --text--

What is A/B testing based on standard UI design practices?

#### --distractors--

It requires smaller participant groups.

---

It uses exit interviews to gather feedback.

---

It only applies to mobile-first designs.

#### --answer--

It tests a new feature with a random subset of users.

### --question--

#### --text--

What does alignment help achieve in a visual layout?

#### --distractors--

It balances all colors equally across the design.

---

It increases contrast between unrelated elements.

---

It forces all elements into the same grid.

#### --answer--

It makes the design look organized and visually clean.

### --question--

#### --text--

Which of the following best describes the goal of composition in visual design?

#### --distractors--

Grouping all UI elements in one corner of the screen.

---

Scaling up every element to fit the full canvas.

---

Using only symmetrical layouts for visual consistency.

#### --answer--

Arranging elements so they relate to each other in a harmonious way.

### --question--

#### --text--

Which design principle is concerned with distributing visual weight to create a sense of equilibrium?

#### --distractors--

Scale

---

Hierarchy

---

Composition

#### --answer--

Balance

### --question--

#### --text--

What does hierarchy help users do when interacting with a visual design?

#### --distractors--

Zoom in on text for better readability.

---

Access navigation menus without scrolling.

---

Choose between symmetrical and asymmetrical layouts.

#### --answer--

Understand which elements are most important at a glance.

### --question--

#### --text--

Which of the following best defines white space in a design context?

#### --distractors--

The white background color used for body text.

---

A gap that must be filled with branding elements.

---

The padding used between interactive buttons.

#### --answer--

The empty area around or between visual elements.

### --question--

#### --text--

What is vector-based design?

#### --distractors--

Drawing with pixel-based tools for realistic detail.

---

Editing scanned images using raster techniques.

---

Building mockups with photos and bitmap textures.

#### --answer--

Creating art using formulas for lines, shapes, and colors.

---

## absolute-and-relative-units

### What Are Absolute Units in CSS, and When Should You Use Them?


---

### What Are Percentages in CSS, and When Should You Use Them?


---

### What Are ems and rems in CSS, and When Should You Use Them?


---

### What Are vh and vw Units, and When Should You Use Them?


---

### What Is the calc() Function, and How Does It Work?


---

### Build an Event Flyer Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `header` element within the body.
1. Your `header` element should have an image in it for your event, and an `h1` in it with your event title, in that order. You can use this image if you would like: `https://cdn.freecodecamp.org/curriculum/labs/event.jpg`
1. You should have a `main` element within the body.
1. Your `main` element should have at least two `section` elements within it showcasing the event features.
1. Your `section` elements each should have an `h2` within them.
1. Your body should have a top and bottom padding of `50px`.
1. Your body should have a top and bottom margin of `0`, and a left and right margin that centers itself.
1. Your body should have a width set relative to the width of the viewport.
1. Your body should use the `calc` function to set its `min-height` property to 100% of the viewport's height minus all padding applied to the top and bottom of the body.
1. You should have at least one `hr` within your flyer.
1. You should set the `width` of all `hr` and `section` elements to a percent value relative to its parent.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### CSS Relative and Absolute Units Review


---

### CSS Relative and Absolute Units Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What is an absolute unit?

#### --distractors--

Units that adjust dynamically based on screen size.

---

Units that depend on the font size of the parent element.

---

Units measured in percentages of the viewport.

#### --answer--

Fixed length units that are not relative to anything else.

### --question--

#### --text--

What does `100vw` cover in terms of screen width?

#### --distractors--

`100%` of the screen width.

---

`100%` of the viewport height.

---

`100%` of the parent's width.

#### --answer--

`100%` of the viewport width.

### --question--

#### --text--

Which of the following is a relative unit?

#### --distractors--

`pt`

---

`cm`

---

`mm`

#### --answer--

`em`

### --question--

#### --text--

If the root font size is `20px`, what is `1rem` equal to?

#### --distractors--

`18px`

---

`16px`

---

`10px`

#### --answer--

`20px`

### --question--

#### --text--

What can the `calc()` function do in CSS?

#### --distractors--

Modify colors dynamically.

---

Set a fixed width.

---

Only work with percentages.

#### --answer--

Add, subtract, multiply, or divide different units.

### --question--

#### --text--

Which unit is the most commonly used absolute unit in CSS?

#### --distractors--

`inch`

---

`rem`

---

`%`

#### --answer--

`px`

### --question--

#### --text--

If the viewport height is `800px`, what would `50vh` be?

#### --distractors--

`50px`

---

`200px`

---

`100px`

#### --answer--

`400px`

### --question--

#### --text--

What does setting an element's width to `100%` mean?

#### --distractors--

It takes up the full width of the document.

---

It takes up the full width of the screen.

---

It takes up `100px`.

#### --answer--

It takes up the full width of its parent.

### --question--

#### --text--

What happens with `calc(10px + 20%)` in CSS?

#### --distractors--

It adds `10px` to `10%` of the document width.

---

It always equals `30px`.

---

It adds `10px` to `20%` of the screen width.

#### --answer--

It adds `10px` to `20%` of the parent's width.

### --question--

#### --text--

Which unit is relative to the font size of the root element?

#### --distractors--

`px`

---

`pt`

---

`%`

#### --answer--

`rem`

### --question--

#### --text--

With a root font size of `16px`, how big is `10rem`?

#### --distractors--

`140px`

---

`10px`

---

`100px`

#### --answer--

`160px`

### --question--

#### --text--

Why might you use `point` instead of `pixels` in design?

#### --distractors--

Points are scalable.

---

Points are better for responsive layouts.

---

Points are easier to manage on screens.

#### --answer--

Points are for print design.

### --question--

#### --text--

Why are `rem` units preferred over `pixels` in typography?

#### --distractors--

Because they provide fixed sizing regardless of screen resolution.

---

Because they ensure compatibility with older browsers.

---

Because they are easier to implement in responsive designs.

#### --answer--

Because they scale proportionally with the user’s browser settings.

### --question--

#### --text--

How much screen space does `80vw` take?

#### --distractors--

`80%` of the parent's width.

---

`100%` of the viewport height.

---

`80px`

#### --answer--

`80%` of the viewport width.

### --question--

#### --text--

Which units should you use if you want to make an element occupy a certain width or height by the percentage of the screen?

#### --distractors--

`pt` and `px`

---

`rem` and `em`

---

`pt` and `pc`

#### --answer--

`vw` and `vh`

### --question--

#### --text--

What does `vw` stand for?

#### --distractors--

Vertical Width.

---

Virtual Width.

---

Variable Width.

#### --answer--

Viewport Width.

### --question--

#### --text--

What's the key difference between `rem` and `em` in CSS?

#### --distractors--

`em` is relative to the root element, while `rem` is relative to the parent element.

---

`rem` is relative to desktop width, while `em` is relative to mobile width.

---

`rem` is relative to the user-defined width, while `em` is relative to the browser width.

#### --answer--

`em` is relative to the font size of the parent element, while `rem` is relative to the root element.

### --question--

#### --text--

What is a `vh` unit?

#### --distractors--

A unit based on the width of the viewport.

---

A unit based on the height of the element.

---

A unit that adjusts based on font size.

#### --answer--

A unit equal to 1% of the viewport height.

### --question--

#### --text--

What does setting an element's width to `auto` do in CSS?

#### --distractors--

It sets the width to `100%` of the parent element by default.

---

It sets the width to `50%` of the viewport unless other styles override it.

---

It sets the width to `0px` if no content or padding is present. 

#### --answer--

It allows the browser to determine the width based on the content and container.

### --question--

#### --text--

What’s a key advantage of the `calc()` function?

#### --distractors--

It automatically minifies your CSS files for better performance.

---

It enables the use of variables within CSS without any preprocessors.

---

It allows embedding JavaScript expressions directly within CSS rules.

#### --answer--

It lets you determine the value of a CSS property dynamically based on different aspects of the application or viewport.

---

## pseudo-classes-and-elements

### What Are Pseudo-classes, and How Do They Work?


---

### What Are Examples of Element User Action Pseudo-classes?


---

### What Are Examples of Input Pseudo-classes?


---

### What Are Examples of Location Pseudo-classes?


---

### What Are Examples of Tree-structural Pseudo-classes?


---

### What Are Examples of Functional Pseudo-classes?


---

### What Are Pseudo-elements, and How Do They Work?


---

### Step 1
In this workshop, you will practice working with different pseudo-classes and pseudo-elements by designing a greeting card. The HTML boilerplate has been provided for you. 

Start the workshop by linking the `styles.css` file.

---

### Step 2
Create a `div` element that has an `id` of `greeting-card` and a `class` of `card`.

Inside the `div` element, add an `h1` with the text `Happy Birthday!`. Then add a paragraph element with a `class` called `message` and the text `Wishing you all the happiness and joy on your special day!`.

---

### Step 3
Now it is time to style your greeting card.

Add a selector for the `body` element, then: 

- change the `font-family` to be `Arial` followed by the generic `sans-serif`,
- give a padding on all sides of `40px`,
- set the `text-align` property to `center`.

---

### Step 4
Now it's time for some color. Give the `body` a `background-color` of `brown` and also give the `.card` a `background-color` of `white`.

---

### Step 5
Give `.card` a `max-width` of `400px`, a `padding` of `40px` on all sides, and a `margin` of `0` for top and bottom and `auto` for left and right (use the shorthand property).

---

### Step 6
The `.card` element needs some more styling: add a `border-radius` of `10px`, and a `box-shadow` with a value of `0 4px 8px gray`.

---

### Step 7
Now add a new `div` below the `.message` element. The new `div` should have a `class` attribute of `card-links`.

---

### Step 8
Add two `a` elements inside the `.card-links` element.

The first one should have a text of `Send Card`, a `class` of `send-link` and an `href` of `#send`.

The second one should have a text of `Share on Social Media`, a `class` of `share-link` and an `href` of `#share`.

---

### Step 9
Add two `section` elements, one after the other. The first should have an `id` of `send`, the second one should have an `id` of `share`.

---

### Step 10
Add an `h2` to `#send` that contains the text `Sending your card...`, then add a `p` element with the text `Card successfully sent to your recipient!`.

---

### Step 11
Time to fill the second `section`! 

Add an `h2` element to the `#share` element that contains the text `Sharing your card...`, then add a `p` element with the text `Your card was shared on social media!`.

---

### Step 12
Add a new selector that changes the `background-color` of the `.card` element to `khaki` when it is hovered over.

---

### Step 13
The `transform` property can transform the element look. For example, giving it a value of `scale(0.9)` would make the element 10% smaller.

```css
p {
  transform: scale(0.9);
}
```

Add a `transform` property to the `.card:hover` selector and set to `scale(1.1)`.

---

### Step 14
When the `a` elements are hovered, the color of the background makes a transition to a different color. You can regulate how that transition happens with the `transition` property:

```css
a {
  transition: color 1s linear;
}
```

The values that the `transition` property accepts are, in order, the property that the transition is applied to, the duration of the transition, and then the timing.

If there are multiple properties that have a transition, you can write the values for each separated by a comma:

```css
p {
  transition: property1 0.1s, property2 0.6s linear;
}
```

If a value is omitted, like the timing for the first property, a default value is applied.

Add to the `.card` selector `transition: transform 0.3s, background-color 0.3s ease`.

Try it out, the hover transition is complete.

---

### Step 15
You can add an emoji in front of the title using the pseudo-element `::before` of the `h1` element.

Create an `h1::before` selector, give it a `content` property and set its value to `"🥳 "` (note there is a space after the emoji).

---

### Step 16
Now you can do something similar to add the emoji also after the title. 

Create a selector that targets the pseudo-element `::after` of the `h1` element. Give it a `content` property and set its value to `" 🥳"` (note there is a space before the emoji).

---

### Step 17
The `.message` element needs some styling. Give it:

- a `font-size` of `1.2em`,
- a `margin-bottom` of `20px`.

---

### Step 18
Add a `.card-links` selector, and set the `margin-top` property to `20px`.

You can add `display: flex` to set an element to use flexbox, you will learn more about flexbox later in the course, you can consider this a small preview.

To space the two links so that they have the same space around, add a `display` property set to `flex`, and a `justify-content` set to `space-around`.

---

### Step 19
Target the `a` elements inside `.card-links` and give them:

- a `text-decoration` property set to `none`.
- a `font-size` property set to `1em`
- a `padding` property set to `10px 20px`
- a `border-radius` property set to `5px`
- a `color` property set to `white`
- a `background-color` property set to `midnightblue`

---

### Step 20
Create a pseudo-class selector that targets the `.card-links a` elements when hovered over.

The `background-color` should change to `orangered`.

---

### Step 21
Add a `transition` property to the `.card-links a` selector and give it a value of `background-color 0.3s ease`.

---

### Step 22
Add a new selector that targets the `.card-links a` elements when they are active. Set the `background-color` to `midnightblue`.

---

### Step 23
Add a new selector that targets the `.card-links a` elements when focused. Set the `outline` property to `2px solid yellow`.

---

### Step 24
Create a new selector that targets the `.card-links a` elements if they have already been visited. Set the property `color` to `crimson`.

---

### Step 25
Create a selector for the `section` elements, and give them:

- a `margin` property set to `20px auto`,
- a `max-width` set to `600px`.
- a `background-color` property set to `whitesmoke`
- a `padding` property set to `20px`
- a `border-radius` property set to `10px`

---

### Step 26
Another value that can be used for the `transform` property is `skewX`, this function skews the element horizontally.

```css
div {
  transform: skewX(7deg);
}
```

Add a selector that targets the `section` elements when hovered. Set the `transform` property to `skewX(10deg)`.

---

### Step 27
As last thing to complete this project, add a `display` property set to `none` to the `section` selector.

After that, create a `section:target` selector, and add there a `display` property set to `block` so that the `section` elements are visible only when the links are clicked.

---

### Step 1
In this workshop, you will practice how to add custom styles to radio buttons by building a parent teacher conference form. The HTML boilerplate has been provided for you.

Start by adding a `main` element with a class called `container`.

---

### Step 2
Next, inside your `main` element, add an `h1` element with the text `Parent Teacher Conference Form` and the classes `title` and `center`.

---

### Step 3
Next, add a paragraph element with the text `Please fill out the form below to help schedule your parent-teacher conference.`. Your paragraph element should also have the classes `description` and `center`.

---

### Step 4
Now it is time to add the `form` and `input` elements, which will represent the parent and student information.

Start by adding a `form` element below the `p` element.

---

### Step 5
The first section of the form will focus on the student's information, like their name and grade.

Inside the `form` element, add a `fieldset` element. Inside that `fieldset` element, add a `legend` element with the text `Student Information`. 

Below the `legend` element, add a `label` element with the text `Full Name: ` and a `for` attribute with the value of `student-name`.

---

### Step 6
The next step is to add the associated `input` element for the student's information.

Start by adding an `input` element with a `type` attribute set to `"text"`. Then add a `name` and `id` attribute, both set to `student-name`. 

Next, add a `placeholder` attribute set to `E.g., Jane Doe`. And finally, add a `required` attribute.

---

### Step 7
Now it is time to add the form elements to collect the student's grade information.

Start by adding another `label` element with the text `Student Grade: ` and `for` attribute set to `"grade"`.

Then, below your `label` element, add an `input` element with the `type` attribute set to `"number"`. The `name` and `id` attributes should be set to `"grade"`. The `placeholder` attribute should be set to `"E.g., 4"`. Lastly, your number `input` should be required.

---

### Step 8
The next step is the section in the form for the parent information. 

Start by adding another `fieldset` element. Inside that `fieldset` element, add a `legend` element with the text `Parent/Guardian Information`.

---

### Step 9
Now it is time to add the form elements to collect the parent's information.

Start by adding a `label` element with the text `Parent/Guardian Name: ` and `for` attribute set to `"parent-name"`.

Then, below your `label` element, add an `input` element with the `type` attribute set to `"text"`. The `name` and `id` attributes should be set to `"parent-name"`. The `placeholder` attribute should be set to `"E.g., Nancy Doe"`. Lastly, your `input` should be required.

---

### Step 10
In the next few steps, you will add the form elements responsible for collecting the user's preferred contact method. 

Start by adding another `fieldset` element with a `legend` element nested inside. Your `legend` element should have the text `Preferred Contact Method`.

---

### Step 11
The next step is to add the `label` and `input` elements for the email contact method.

Start by adding a label with a class of `"contact-method"` and a `for` attribute set to `"email"`. The label text should be `Email: `.

Below your `label` element, add a radio button with `id` and `value` attributes set to `"email"`. The `name` attribute should be set to `"contact-method"` and the class should be set to `"contact-method-radio-btn"`. 

Lastly, make sure this radio button is checked by default.

---

### Step 12
Next, add another label with a class of `"contact-method"` and a `for` attribute set to `"phone"`. The label text should be `Phone: `.

Below your `label` element, add a radio button with `id` and `value` attributes set to `"phone"`. The `name` attribute should be set to `"contact-method"` and the class should be set to `"contact-method-radio-btn"`.

---

### Step 13
It's a good practice to allow users to add additional notes or concerns.

Below your third `fieldset` element, add a new `fieldset` element. Inside, add a `legend` element with the text `Additional Notes`.

---

### Step 14
Now, add a `label` element with the text `Any specific concerns or topics you'd like to discuss?` and a `for` attribute set to `notes`.

Below this `label`, add a `textarea` element. Set its `id` to `notes`, `name` to `notes`, `rows` to `4`, and `cols` to `50`.

---

### Step 15
Finally, you should add the submit button for the form.

Below the last `fieldset` element, add a `button` element with the class `submit-btn` and `type` attribute set to `"submit"`. The text content of the button should be `Submit Form`.

With this, your HTML structure is complete!

---

### Step 16
Now that the HTML structure is complete, you should move on to the CSS styling.

Open your `styles.css` file. First, set a dark background color for the `body` and a light color for the text.

Select the `body` element and set its `background-color` to `midnightblue` and `color` to `whitesmoke`.

---

### Step 17
Next, you should style the main container. Select the element with the class `container` and set its `background-color` to the hex-code `#ffffff1a`.

A hex code is a six-digit combination of numbers and letters used in HTML and CSS to represent colors. It starts with a `#` followed by three pairs:

- The first two digits represent red
- The next two represent green
- The last two represent blue

For example, `#ffffff` is pure white because it has the maximum value for red, green, and blue.

You can also add two extra digits at the end to control opacity (called the alpha channel). In `#ffffff1a`, the `1a` makes the white color semi-transparent. The lower the alpha value, the more transparent the color appears. You'll learn more about hex codes later!

---

### Step 18
Continuing with the main container, give the `container` class a `width` of `80%` and a `max-width` of `600px`. Also, add a `border-radius` of `10px` and set `margin` to `20px auto` to center it horizontally.

---

### Step 19
Now, you should add some padding to the container. Set `padding` to `10px 20px`. This way, you set a padding of `10px` on the top and bottom, and `20px` on the left and right.

---

### Step 20
To make the container stand out, you should add a `box-shadow` set to `0 5px 15px black`. 

This adds a shadow effect around the container. The values control the horizontal offset, vertical offset, blur radius, and color respectively.

---

### Step 21
You added a `center` class to some elements in the HTML. Now, you should define that class to center those elements.

Target the `center` class and center the elements having it with a `text-align` property set to `center`.

---

### Step 22
The description text needs to be a bit larger. Select the element with the class `description` and set its `font-size` to `1.2rem`.

---

### Step 23
Time to style the `fieldset` elements to give them a distinct border.

Select the `fieldset` element. Set its `border` to `1px solid gray`, `border-radius` to `5px`, `margin` to `20px 0`, and `padding` to `20px`.

---

### Step 24
To make the `legend` text more prominent, you need to style it.

Select the `fieldset legend` element. Set its `font-size` to `1.3rem` and its `font-weight` to `600`.

`font-weight` controls the boldness of text. 

Common values of `font-weight` are:

- `normal` → Regular weight (default)
- `bold` → Bold text
- `lighter` → Lighter than the parent element
- `bolder` → Bolder than the parent element
- Numeric values like:
  - `100` (thin)
  - `400` (normal)
  - `700` (bold)
  - `900` (extra bold)

---

### Step 25
Now, you should increase the font size for all `label` elements.

Select the `label` element and set its `font-size` to `1.2rem`.

---

### Step 26
By default, `label` elements are inline. To make them stack vertically (except for your radio button labels), use the `:not()` pseudo-class.

The `:not()` pseudo-class negates a selection. Here, it selects all `label` elements that do not have the class `contact-method`.

Select `label:not(.contact-method)`, then set `display` to `block` and `margin` to `10px 0`.

---

### Step 27
Now, you should style the `input` and `textarea` elements. It's often a good idea to start with general styles for `input` and `textarea`, then refine specific types.

Select `input:not(.contact-method-radio-btn), textarea`. Set `background-color` to `#ffffff1a`, `width` to `95%`, `border` to `1px solid gray`, `border-radius` to `5px`, and `padding` to `10px`.

The `:not(.contact-method-radio-btn)` part excludes radio buttons with that class from being styled by this rule. This way, we can apply general styles to most inputs while keeping radio buttons separate.

These styles will make your form fields wider and more readable. Try previewing the form to see how the layout changes.

---

### Step 28
To ensure the text entered into inputs and textareas, as well as their placeholders, is visible, set their color.

Select `input, input::placeholder, textarea` and set `color` to `whitesmoke`.

---

### Step 29
Now, it's time to customize the radio buttons. By default, radio buttons have a native browser appearance. You want to remove this so you can create a custom look.

Select the element with the class `contact-method-radio-btn`. Set `appearance` to `none`.

---

### Step 30
You should give your custom radio buttons a size and shape.

Still targeting `.contact-method-radio-btn`, set `width` to `20px`, `height` to `20px`, `border-radius` to `50%`, and `border` to `2px solid gray`.

---

### Step 31
By default, form elements like radio buttons might not sit perfectly aligned with their labels, especially if the label text is taller or has different font settings.

To align the radio buttons vertically with their labels, you can use the `vertical-align` property. This property controls how inline or inline-block elements line up vertically with the surrounding text.

Now, set `vertical-align` to `bottom` for the radio buttons. You can experiment with other values like `middle` or `top` to see how they affect alignment, but `bottom` usually works well for radio buttons next to labels.

---

### Step 32
Now, you should create the inner circle that will appear when the radio button is checked. You will use the `::before` pseudo-element for this.

A pseudo-element like `::before` lets you insert extra content before the actual element. This is often used for decorative purposes.

Targeting `.contact-method-radio-btn::before` pseudo-element, set a `display` of `block`, `content` of `" "`, `width` of `10px`, `height` of `10px`, and `border-radius` of `50%`.

---

### Step 33
You need to position the inner circle and make it initially invisible.

Still targeting `.contact-method-radio-btn::before`, set `transform` to `translate(3px, 3px) scale(0)`. The `translate` function moves the circle slightly, and `scale(0)` shrinks it to zero size so it’s hidden by default. 

Also, add a `transition` of `all 0.3s ease-in` to create a smooth animation when it appears. This means any style change will animate over 0.3 seconds, starting slowly and speeding up.

---

### Step 34
Now, it's time to define what happens when the radio button is checked.

You are styling the inner circle only when the radio button is selected, so your selector should be `.contact-method-radio-btn:checked::before`.

In the rule, set `transform` to `translate(3px, 3px) scale(1)` and `background-color` to `lightgreen`.

The `transform` moves the inner circle slightly and scales it up to full size with `scale(1)`, and a background of lightgreen fills the circle with color to show that the option is selected, making it visible.

---

### Step 35
Time to style the submit button.

Select the element with the class `submit-btn`. Set `cursor` to `pointer` (to indicate it's clickable), `background-color` to `royalblue`, `color` to `whitesmoke`, `border` to `none`, `border-radius` to `6px`, and `padding` to `12px 20px`.

---

### Step 36
Set `font-size` to `1.1rem`, `display` to `block`, and `margin` to `auto` to center the button.

---

### Step 37
Finally, add a hover effect to the submit button for better user feedback.

Select `.submit-btn:hover` and set its `background-color` to `midnightblue`.

Congratulations on finishing this workshop!

---

### Build a Job Application Form
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab. 

**User Stories:**

1. You should have a `div` element with the class `container`.
1. Inside the `div` element, you should have a `form` element.
1. The form should contain an `input` element with the type `text` and the id `name` for entering the user's full name.
1. You should have another `input` element with the type `email` and the id `email` for entering the user's email address.
1. The form should include a `select` element with the id `position` that allows users to select a job position.
1. You should have a `fieldset` element with class of `radio-group`.
1. Inside `.radio-group` you should have a set of `input` elements with the type `radio` and relevant labels for selecting availability options (e.g., Full-Time, Part-Time). The group `name` should be `availability`.
1. You should have a `textarea` element with the id `message` for entering a message.
1. You should associate every `input`, `select`, and `textarea` element with a `label` element.
1. You should have a `button` element with the type `submit` for submitting the form.
1. Add a `:focus` pseudo-class to the `input` and `textarea` elements to change their border color and remove the default outline when focused.
1. The `input`, `select` and `textarea` elements should have an `:invalid` pseudo-class that changes the border color to red when invalid input is detected.
1. The `input`, `select` and `textarea` elements should have a `:valid` pseudo-class that changes the border color to green when valid input is entered.
1. The `button` element should have a `:hover` pseudo-class that changes the background color when hovered over.
1. Use the `:checked` pseudo-class on `.radio-group input[type="radio"]` to add a border color, background color and a box shadow when the radio button is selected.
1. Use the `:checked` pseudo-class on radio buttons to change the text color of the associated `label` when the option is selected.
1. Add a `:first-of-type` pseudo-class to the `input` element to style the first input field differently. (e.g., rounded corners).

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### CSS Pseudo-classes Review


---

### CSS Pseudo-classes Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What are pseudo-classes?

#### --distractors--

They are CSS rules that create additional content within an element when needed.

---

They are properties that adjust an element's size or layout on the page.

---

They are selectors used to add movement effects to an element during interactions.

#### --answer--

They are keywords added to a selector that style an element based on its state.

### --question--

#### --text--

Which pseudo-class applies when a pointing device is being positioned over an element?

#### --distractors--

`:focus`

---

`:active`

---

`:checked`

#### --answer--

`:hover`

### --question--

#### --text--

Which pseudo-element allows you to style the first letter of a paragraph?

#### --distractors--

`:first-letter`

---

`:first-child`

---

`:last-of-type`

#### --answer--

`::first-letter`

### --question--

#### --text--

Which pseudo-class changes the style of an element while it is being clicked?

#### --distractors--

`:focus`

---

`:hover`

---

`:checked`

#### --answer--

`:active`

### --question--

#### --text--

Which pseudo-class is used to style an element when it is ready to receive user input, such as a text field being clicked or tabbed into?

#### --distractors--

`::focus`

---

`:active`

---

`:visited`

#### --answer--

`:focus`

### --question--

#### --text--

Which of the following CSS rules correctly adds the text `Note:` in front of each paragraph element with a class of `note`?

#### --distractors--

```css
.note::before {
  content: "Note:";
}
```

---

```css
p.note::after {
  content: "Note:";
}
```

---

```css
p::before {
  content: "Note:";
}
```

#### --answer--

```css
p.note::before {
  content: "Note:";
}
```

### --question--

#### --text--

Which pseudo-class applies to an input field when it is selected or toggled on?

#### --distractors--

`:required`

---

`:disabled`

---

`:optional`

#### --answer--

`:checked`

### --question--

#### --text--

Which of the following is the correct syntax to style the last child of a list?

#### --distractors--

```css
li:nth-child(last) {
  color: blue;
}
```

---

```css
#li:last-child {
  color: blue;
}
```

---

```css
.li:last-child() {
  color: blue;
}
```

#### --answer--

```css
li:last-child {
  color: blue;
}
```

### --question--

#### --text--

Which pseudo-class targets input fields that are not required to fill out?

#### --distractors--

`:required`

---

`:enabled`

---

`::optional`

#### --answer--

`:optional`

### --question--

#### --text--

What does the `:disabled` pseudo-class do?

#### --distractors--

It styles checked inputs.

---

It styles elements being hovered over.

---

It selects elements that do not match a given selector.

#### --answer--

It styles elements that are not available for user interaction.

### --question--

#### --text--

Which pseudo-class applies when a form input meets its validation criteria?

#### --distractors--

`:checked`

---

`:required`

---

`:disabled`

#### --answer--

`:valid`

### --question--

#### --text--

Which one of these is not a location pseudo-class?

#### --distractors--

`:visited`

---

`:any-link`

---

`:link`

#### --answer--

`:current`

### --question--

#### --text--

Which of the following selects the third list item?

#### --distractors--

```css
li:child(3) {
  color: red;
}
```

---

```css
li:last-child(3) {
  color: red;
}
```

---

```css
li:nth-child(three) {
  color: red;
}
```

#### --answer--

```css
li:nth-child(3) {
  color: red;
}
```

### --question--

#### --text--

Which elements will have a `color` of `blue` with the following CSS?

```css
p:is(.blue, .highlight) {
  color: blue;
}
```

#### --distractors--

```html
<p class="class">Paragraph 1</p>
<p class="highlight">Paragraph 2</p>
```

---

```html
<div class="blue">Paragraph 1</div>
<div class="highlight">Paragraph 2</div>
```

---

```html
<p>Paragraph 1</p>
<span class="highlight">Paragraph 2</span>
```

#### --answer--

```html
<p class="blue">Paragraph 1</p>
<p class="highlight">Paragraph 2</p>
```

### --question--

#### --text--

What does the `:not()` pseudo-class do?

#### --distractors--

It adds styles to all elements.

---

It selects all child elements of a parent.

---

It selects elements that match a given selector.

#### --answer--

It selects elements that do not match a given selector.

### --question--

#### --text--

What does the following CSS rule do?

```css
p:first-of-type {
  font-style: italic;
}
```

#### --distractors--

It selects the first `p` element in the document.

---

It selects all `p` elements in the document.

---

It selects the first child of every `p` element.

#### --answer--

It selects the first `p` element within a parent container.

### --question--

#### --text--

What does the `:last-of-type` pseudo class do?

#### --distractors--

It selects the first child element of a specific type within its parent.

---

It selects the middle child element of a specific type within its parent.

---

It selects every child element of a specific type within its parent.

#### --answer--

It selects the last child element of a specific type within its parent.

### --question--

#### --text--

Which pseudo-class is used to select the second item in a list?

#### --distractors--

`:first-child`

---

`:required`

---

`:is()`

#### --answer--

`:nth-child(2)`

### --question--

#### --text--

Which one of these is a functional pseudo-class?

#### --distractors--

`:first-child`

---

`:match()`

---

`:checked`

#### --answer--

`:is()`

### --question--

#### --text--

Which one of these is not a functional pseudo-class?

#### --distractors--

`:has()`

---

`:not()`

---

`:where()`

#### --answer--

`:contains()`

## --quiz--

### --question--

#### --text--

Which pseudo-class is used to target form elements that are enabled?

#### --distractors--

`:disabled`

---

`:active`

---

`:focus`

#### --answer--

`:enabled`

### --question--

#### --text--

Which pseudo-class allows you to select elements by counting from the end?

#### --distractors--

`:nth-child(n)`

---

`:last-child`

---

`:last-of-type`

#### --answer--

`:nth-last-child(n)`

### --question--

#### --text--

Which of the following allows you to select elements that contain specific child elements?

#### --distractors--

`:is()`

---

`:where()`

---

`:in-range`

#### --answer--

`:has()`

### --question--

#### --text--

Which of the following selects elements that do not contain any content or child elements?

#### --distractors--

`:only-child`

---

`:last-child`

---

`:not()`

#### --answer--

`:empty`

### --question--

#### --text--

What does this CSS selector target?

```css
input:invalid {
  background-color: red;
}
```

#### --distractors--

All input elements.

---

All input elements with values inside the allowed range.

---

All input elements that pass validation.

#### --answer--

All input elements that fail validation.

### --question--

#### --text--

Which pseudo-class selects input fields whose value is automatically filled by the browser?

#### --distractors--

`:visited`

---

`:valid`

---

`:where()`

#### --answer--

`:autofill`

### --question--

#### --text--

Which pseudo-class selects an element if it or any of its descendants is focused?

#### --distractors--

`:focus`

---

`:in-range`

---

`:only-child`

#### --answer--

`:focus-within`

### --question--

#### --text--

Which pseudo class represents links that point to the same document?

#### --distractors--

`:target`

---

`:visited`

---

`:link`

#### --answer--

`:local-link`

### --question--

#### --text--

Which of the following styles the `p` element when it is the target of a URL fragment?

#### --distractors--

```css
p:empty {
  background-color: gold;
}
```

---

```css
p:not(.targeted) {
  background-color: gold;
}
```

---

```css
p:is(.target) {
  background-color: gold;
}
```

#### --answer--

```css
p:target {
  background-color: gold;
}
```

### --question--

#### --text--

Which pseudo-class is used when an element is the target of a URL fragment?

#### --distractors--

`:focus-within`

---

`:hover`

---

`:visited`

#### --answer--

`:target`

### --question--

#### --text--

What does the `:only-child` pseudo-class select?

#### --distractors--

It selects the parent element which has only one child.

---

It selects all child elements inside the parent element.

---

It selects the parent element that contains only one type of child element.

#### --answer--

It selects an element that has no siblings inside its parent element.

### --question--

#### --text--

Which pseudo-class selects an element if it's the only one of its type within its parent?

#### --distractors--

`:only-child`

---

`:nth-of-type(n)`

---

`:first-of-type`

#### --answer--

`:only-of-type`

### --question--

#### --text--

Which CSS rule will apply a `color` of `yellow` to the second `p` element in the following HTML?

```html
<div>
  <h1>Courses</h1>
  <p>HTML</p>
  <p>CSS</p>
  <p>JavaScript</p>
</div>
```

#### --distractors--

```css
p:nth-child(2) {
  color: yellow;
}
```

---

```css
p:first-of-type {
  color: yellow;
}
```

---

```css
p:last-of-type {
  color: yellow;
}
```

#### --answer--

```css
p:nth-of-type(2) {
  color: yellow;
}
```

### --question--

#### --text--

Which pseudo-element allows you to select the marker of list items for styling?

#### --distractors--

`::before`

---

`::after`

---

`:root`

#### --answer--

`::marker`

### --question--

#### --text--

Which pseudo-class allows you to target the highest-level element in the document, typically the `html` element?

#### --distractors--

`:first-child`

---

`:in-range`

---

`:target`

#### --answer--

`:root`

### --question--

#### --text--

Which CSS pseudo-class has a specificity of zero, ensuring it won’t interfere with other specific styling rules?

#### --distractors--

`:is()`

---

`:not()`

---

`:focus`

#### --answer--

`:where()`

### --question--

#### --text--

Which one of the following is a tree-structural pseudo-class?

#### --distractors--

`:where()`

---

`:valid`

---

`:link`

#### --answer--

`:root`

### --question--

#### --text--

Which CSS rule will set the `background-color` of the following element to `red` if its value is outside the specified range?

```html
<input type="number" min="10" max="25"/>
```

#### --distractors--

```css
input:in-range {
  background-color: red;
}
```

---

```css
input {
  background-color: red;
}
```

---

```css
input:valid {
  background-color: red;
}
```

#### --answer--

```css
input:out-of-range {
  background-color: red;
}
```

### --question--

#### --text--

Which pseudo-element uses the `content` property to insert content after the element?

#### --distractors--

`::before`

---

`::marker`

---

`::first-letter`

#### --answer--

`::after`

### --question--

#### --text--

Which pseudo-class applies styles to an element if its value is within the specified range?

#### --distractors--

`:out-of-range`

---

`:enabled`

---

`:checked`

#### --answer--

`:in-range`

---

## css-colors

### What Is Color Theory in Design?
Color theory is the study of how colors interact with each other and how they affect our perception. It covers color relationships, color harmony, and the psychological impact of color. Let's start diving into this world. Colors can be classified as either primary, secondary, or tertiary.

Primary colors, yellow, blue, and red, are the fundamental hues from which all other colors are derived.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-1.png" alt="Color classification diagram" />

Secondary colors result from mixing equal amounts of two primary colors. Green, orange, and purple are examples of secondary colors.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-2.png" alt="Primary colors diagram" />

For example, green is the result of combining yellow and blue.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-3.png" alt="Secondary colors diagram" />

Tertiary colors result from combining a primary color with a neighboring secondary color. Yellow-Green, Blue-Green, and Blue-Violet, are examples of tertiary colors.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-4.png" alt="Green color mixing example" />

This is a fundamental classification in the world of color theory, but there are other ways to classify colors. They can be classified as warm or cool, based on their temperature.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-5.png" alt="Warm and cool colors diagram" />

Warm colors, like reds, oranges, and yellows, evoke feelings of comfort, warmth, and coziness.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-6.png" alt="Warm colors examples" />

Cool colors, like blues, green, and purples, evoke feelings of calmness, serenity, and professionalism.

Colors can also be represented through color models. They are essential for describing and reproducing colors in a standard way. Frequently used color models include the RGB model, the HSV model, and the HSL model. They represent colors based on different properties. You will learn more about them in future lessons.

Great. Now that you know more about this, let's talk about a fundamental tool that designers use to represent colors and their relationships.

The color wheel is a circular diagram that shows how colors relate to each other. It's an essential tool for designers because it helps them to select color combinations. This is very helpful for creating color palettes and color schemes.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-7.png" alt="Color wheel diagram" />

A color scheme is the set of colors chosen for a specific design or project. They are usually based on the principles of color theory. By understanding the relationships between colors on the wheel, you can develop different types of color schemes. Let's see some of them.

Analogous color schemes create cohesive and soothing experiences. They have analogous colors, which are adjacent to each other in the color wheel.

<!-- <img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-8.png" alt="Analogous color scheme example" /> -->

Complementary color schemes create high contrast and visual impact. Their colors are located on the opposite ends of the color wheel, relative to each other.

Color contrast is essential for web accessibility. It ensures that text and other important elements are clearly distinguishable from their background. This is especially important for people with visual disabilities.

In an RGB color wheel, complementary colors are located at the opposite ends of the wheel. For example, magenta is complementary to green and blue is complementary to yellow and so on.

<!-- <img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-9.png" alt="RGB color wheel with complementary colors" /> -->

A triadic color scheme has vibrant colors. They are made from colors that are approximately equidistant from each other. If they are connected, they form an equilateral triangle on the color wheel.

<!-- <img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-10.png" alt="Triadic color scheme example" /> -->

And finally, we have the monochromatic color scheme. In this color scheme, all the colors are derived from the same base color by adjusting its lightness, darkness, and saturation. This evokes a feeling of unity and harmony while still creating contrast.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/lecture-what-is-color-theory-in-design-11.png" alt="Monochromatic color scheme example" />

And finally, here are some tips for using color effectively in web development:

- Create a color scheme that defines your website's branding.
- Use colors to evoke the emotions and perceptions that align with your goals.
- Choose colors with enough contrast to make your website accessible for everyone.
- Use color to highlight important elements of your website, like buttons.
- Use color consistently and use it to create a visual hierarchy.

Color theory is a core aspect of design. By understanding color psychology, harmonies, and accessibility, you can create effective designs, evoke emotions, and enhance user experience.

# --questions--

## --text--

Why is color theory important for web development?

## --answers--

It's not important because it has no impact on user experience.

### --feedback--

Think about how color affects user perception and emotions.

---

It helps designers create visually appealing websites.

---

It's only important for print design.

### --feedback--

Think about how color affects user perception and emotions.

---

It's irrelevant to modern web design trends.

### --feedback--

Think about how color affects user perception and emotions.

## --video-solution--

2

## --text--

Which color scheme is most likely to create cohesive and soothing experiences?

## --answers--

Analogous

---

Complementary

### --feedback--

Think about the emotional impact of colors placed adjacent to each other.

---

Monochromatic

### --feedback--

Think about the emotional impact of colors placed adjacent to each other.

---

Triadic

### --feedback--

Think about the emotional impact of colors placed adjacent to each other.

## --video-solution--

1

## --text--

The concept of color harmony refers to:

## --answers--

Using only one color in a design.

### --feedback--

Think about how colors work together in a design.

---

Combining colors that clash with each other.

### --feedback--

Think about how colors work together in a design.

---

Creating visually effective color combinations.

---

The brightness or darkness of a color.

### --feedback--

Think about how colors work together in a design.

## --video-solution--

3

---

### What Are Named Colors in CSS, and When to Use Them?


---

### What Is the RGB Color Model, and How Does the RGB Function Work in CSS?


---

### What Is the HSL Color Model, and How Does the HSL Function Work in CSS?


---

### What Are Hex Codes, and How Do They Work in CSS?


---

### What Are Linear and Radial Gradients, and How Do They Work in CSS?


---

### Step 1
Within the `body`, nest an `h1` element with the text `CSS Color Markers`.

---

### Step 2
In this project you'll work with an external CSS file to style the page. A `styles.css` file has been already created for you. But before you can use it, you'll need to link it to the page.

Nest a `link` element within the `head` element. Give it a `rel` attribute set to `"stylesheet"` and an `href` attribute set to `"styles.css"`.

---

### Step 3
Now that your external CSS file is set up, you can start styling the page.

As a reminder, here's how to target a paragraph element and align it to the right:

```css
p {
  text-align: right;
}
```

Create a new CSS rule that targets the `h1` element, and set its `text-align` property to `center`.

---

### Step 4
Now you'll add some elements that you'll eventually style into color markers.

First, within the `body` element, add a `div` element with a `class` attribute set to `container`. Make sure the `div` element is placed below the `h1` element.

---

### Step 5
Next, within the `div` element, add another `div` element and give it a class of `marker`.

---

### Step 6
It's time to add some color to the marker. Remember that one way to add color to an element is to use a <dfn>color keyword</dfn> like `black`, `cyan`, or `yellow`.

As a reminder, here's how to target the class `freecodecamp`:

```css
.freecodecamp {
  
}
```

Create a new CSS rule that targets the class `marker`, and set its `background-color` property to `red`.

**Note:** You will not see any changes after adding the CSS.

---

### Step 7
The background color was applied, but since the marker `div` element has no content in it, it doesn't have any height by default.

In your `.marker` CSS rule, set the `height` property to `25px` and the `width` property to `200px`

---

### Step 8
Your marker would look better if it were centered on the page. An easy way to do this is by using the `margin` <dfn>shorthand property</dfn>.

You can set the margin area of elements separately with properties like `margin-top` and `margin-left`, the `margin` shorthand property makes it easy to set multiple margin areas at the same time.

To center your marker on the page, set its `margin` property to `auto`. This sets `margin-top`, `margin-right`, `margin-bottom`, and `margin-left` all to `auto`.

---

### Step 9
Now that you've got one marker centered with color, it's time to add the other markers.

In the `.container` element, add two more `div` elements and give them each a class of `marker`.

---

### Step 10
While you have three separate marker `div` elements, they look like one big rectangle. You should add some space between them to make it easier to see each element.

When the shorthand `margin` property has two values, it sets `margin-top` and `margin-bottom` to the first value, and `margin-left` and `margin-right` to the second value.

In your `.marker` CSS rule, set the `margin` property to `10px auto`.

---

### Step 11
To give the markers different colors, you'll need to add a unique class to each one. You can add multiple classes to an element by listing them in the `class` attribute and separating them with a space. For example, the following code adds both the `animal` and `dog` classes to a `div` element:

```html
<div class="animal dog">
```

If you add multiple classes to an HTML element, the styles of the first classes you list in the stylesheet may be overridden by later classes.

To begin, add the class `one` to the first marker `div` element.

---

### Step 12
Next, remove the `background-color` property and its value from the `.marker` CSS rule.

---

### Step 13
Then, create a new CSS rule that targets the class `one` and set its `background-color` property to `red`.

---

### Step 14
Add the class `two` to the second marker `div` and the class `three` to the third marker `div`.

---

### Step 15
Create a CSS rule that targets the class `two` and set its `background-color` property to `green`. 

Also, create a separate CSS rule that targets the class `three` and set its `background-color` to `blue`.

---

### Step 16
As you have learned in the lessons, there are two main color models: the <dfn>additive</dfn> RGB (red, green, blue) model, used in electronic devices, and the <dfn>subtractive</dfn> CMYK (cyan, magenta, yellow, black) model, used in print.

In this project, you'll work with the RGB model. This means colors start as black and change as different levels of red, green, and blue are introduced. An easy way to see this is with the CSS `rgb` function.

Create a new CSS rule that targets the class `container` and set its `background-color` to black with `rgb(0, 0, 0)`.

---

### Step 17
As you have learned in previous lessons, a function is a piece of code that can take an input and perform a specific action. The CSS `rgb` function accepts values, or <dfn>arguments</dfn>, for red, green, and blue, and produces a color:

```css
rgb(red, green, blue);
```

Each red, green, and blue value is a number from `0` to `255`. `0` means that there's 0% of that color, and is black. `255` means that there's 100% of that color.

In the `.one` CSS rule, replace the color keyword `red` with the `rgb` function. For the `rgb` function, set the value for red to `255`, the value for green to `0`, and the value for blue to `0`.

---

### Step 18
Notice that the `background-color` for your marker is still red. This is because you set the red value of the `rgb` function to the max of `255`, or 100% red, and set both the green and blue values to `0`.

Now use the `rgb` function to set the other colors.

In the `.two` CSS rule, use the `rgb` function to set the `background-color` to the max value for green, and `0` for the other values. And in the `.three` CSS rule, use the `rgb` function to set the `background-color` to the max value for blue, and `0` for the other values.

---

### Step 19
While the red and blue markers look the same, the green one is much lighter than it was before. This is because the `green` color keyword is actually a darker shade, and is about halfway between black and the maximum value for green.

In the `.two` CSS rule, set the green value in the `rgb` function to `127` to lower its intensity.

---

### Step 20
Now add a little more vertical space between your markers and the edge of the `container` element they're in.

In the `.container` CSS rule, use the shorthand `padding` property to add `10px` of top and bottom padding, and set the left and right padding to `0`. This works similarly to the shorthand `margin` property you used earlier.

---

### Step 21
In the additive RGB color model, <dfn>primary colors</dfn> are colors that, when combined, create pure white. But for this to happen, each color needs to be at its highest intensity.

Before you combine colors, set your green marker back to pure green. For the `rgb` function in the `.two` CSS rule, set green back to the max value of `255`.

---

### Step 22
Now that you have the primary RGB colors, it's time to combine them.

For the `rgb` function in the `.container` rule, set the red, green, and blue values to the max of `255`.

---

### Step 23
<dfn>Secondary colors</dfn> are the colors you get when you combine primary colors. You might have noticed some secondary colors in the last step as you changed the red, green, and blue values.

To create the first secondary color, yellow, update the `rgb` function in the `.one` CSS rule to combine pure red and pure green.

---

### Step 24
To create the next secondary color, cyan, update the `rgb` function in the `.two` CSS rule to combine pure green and pure blue.

---

### Step 25
To create the final secondary color, magenta, update the `rgb` function in the `.three` CSS rule to combine pure blue and pure red.

---

### Step 26
Now that you've practiced with secondary colors, here's a review of how to create <dfn>tertiary colors</dfn>: tertiary colors are created by combining a primary color with a nearby secondary color.

To create the tertiary color orange, update the `rgb` function in the `.one` CSS rule by setting red to its maximum value (`255`) and green to `127`.

---

### Step 27
Notice that, to create orange, you increased the intensity of red and decreased the intensity of green in the `rgb` values. This is because orange is created by blending red with yellow.

To create the tertiary color spring green, combine cyan with green. Update the `rgb` function in the `.two` CSS rule by setting green to its maximum value and blue to `127`.

---

### Step 28
To create the tertiary color violet, combine magenta with blue. Update the `rgb` function in the `.three` CSS rule by setting blue to its maximum value and red to `127`.

---

### Step 29
There are three more tertiary colors: chartreuse green (green + yellow), azure (blue + cyan), and rose (red + magenta).

To create chartreuse green, update the `rgb` function in the `.one` CSS rule so that red is at `127`, and set green to the max value.

For azure, update the `rgb` function in the `.two` CSS rule so that green is at `127` and blue is at the max value.

And for rose, which is sometimes called bright pink, update the `rgb` function in the `.three` CSS rule so that blue is at `127` and red is at the max value.

---

### Step 30
Now that you've gone through all the primary, secondary, and tertiary colors on a color wheel, it'll be easier to understand other color theory concepts and how they impact design.

First, in the CSS rules `.one`, `.two`, and `.three`, adjust the values in the `rgb` function so that the `background-color` of each element is set to pure black. Remember that the `rgb` function uses the additive color model, where colors start as black and change as the values of red, green, and blue increase.

---

### Step 31
A color wheel is a circle where similar colors, or <dfn>hues</dfn>, are near each other, and different ones are further apart. For example, pure red is between the hues rose and orange.

Two colors that are opposite from each other on the color wheel are called <dfn>complementary colors</dfn>. If two complementary colors are combined, they produce gray. But when they are placed side-by-side, these colors produce strong visual contrast and appear brighter.

In the `rgb` function for the `.one` CSS rule, set the red value to the max of `255` to produce pure red. In the `rgb` function for `.two` CSS rule, set the values for green and blue to the max of `255` to produce cyan.

---

### Step 32
Notice that the red and cyan colors are very bright right next to each other. This contrast can be distracting if it's overused on a website, and can make text hard to read if it's placed on a complementary-colored background.

It's better practice to choose one color as the dominant color, and use its complementary color as an accent to bring attention to certain content on the page.

First, in the `h1` rule, use the `rgb` function to set its `background-color` to cyan.

---

### Step 33
Next, in the `.one` CSS rule, use the `rgb` function to set the `background-color` to black. And in the `.two` CSS rule, use the `rgb` function to set the `background-color` to red.

---

### Step 34
Notice how your eyes are naturally drawn to the red color in the center? When designing a site, you can use this effect to draw attention to important headings, buttons, or links.

There are several other important color combinations outside of complementary colors, but you'll learn those a bit later.

For now, use the `rgb` function in the `.two` CSS rule to set the `background-color` to black.

---

### Step 35
In the `h1` CSS rule, remove the `background-color` property and its value to revert to the default white color.

---

### Step 36
Now it's time to add other details to the markers, starting with the first one.

In the first marker `div` element, change the class `one` to `red`.

---

### Step 37
Update the `.one` CSS rule to target the new `red` class.

---

### Step 38
Update the `rgb` function in the `.red` CSS rule by setting the red value to its maximum.

---

### Step 39
Next, change the class `two` to `green` in the second marker `div` and change the class `three` to `blue` in the third marker `div`.

---

### Step 40
Update the CSS class selector `.two` so it targets the new `green` class. And update the `.three` class selector so it targets the new `blue` class.

---

### Step 41
A very common way to apply color to an element with CSS is with <dfn>hexadecimal</dfn> or hex values. While hex values sound complicated, they're really just another form of RGB values.

Hex color values start with a `#` character and take six characters from 0-9 and A-F. The first pair of characters represent red, the second pair represent green, and the third pair represent blue. For example, `#4B5320`.

In the `.green` class selector, set the `background-color` property to a hex color code with the values `00` for red, `FF` for green, and `00` blue.

---

### Step 42
You may already be familiar with decimal, or base 10 values, which go from 0 - 9. Hexadecimal, or base 16 values, go from 0 - 9, then A - F:

```js
0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
```

With hex colors, `00` is 0% of that color, and `FF` is 100%. So `#00FF00` translates to 0% red, 100% green, and 0% blue, and is the same as `rgb(0, 255, 0)`.

Lower the intensity of green by setting the green value of the hex color to `7F`.

---

### Step 43
The <dfn>HSL</dfn> color model, or hue, saturation, and lightness, is another way to represent colors.

The CSS `hsl` function accepts 3 values: a number from 0 to 360 for hue, a percentage from 0 to 100 for saturation, and a percentage from 0 to 100 for lightness.

If you imagine a color wheel, the hue red is at 0 degrees, green is at 120 degrees, and blue is at 240 degrees.

Saturation is the intensity of a color from 0%, or gray, to 100% for pure color. You must add the percent sign `%` to the saturation and lightness values.

Lightness is how bright a color appears, from 0%, or complete black, to 100%, complete white, with 50% being neutral.

In the `.blue` CSS rule, use the `hsl` function to change the `background-color` property to pure blue. Set the hue to `240`, the saturation to `100%`, and the lightness to `50%`.

---

### Step 44
You've practiced a few ways to set flat colors in CSS, but you can also use a color transition, or <dfn>gradient</dfn>, on an element.

A gradient is when one color transitions into another. The CSS `linear-gradient` function lets you control the direction of the transition along a line, and which colors are used.

One thing to remember is that the `linear-gradient` function actually creates an `image` element, and is usually paired with the `background` property which can accept an image as a value.

In the `.red` CSS rule, change the `background-color` property to `background`.

---

### Step 45
The `linear-gradient` function is very flexible — here is the basic syntax you'll review in this tutorial:

```css
linear-gradient(gradientDirection, color1, color2, ...);
```

`gradientDirection` is the direction of the line used for the transition. `color1` and `color2` are color arguments, which are the colors that will be used in the transition itself. These can be any type of color, including color keywords, hex, `rgb`, or `hsl`.

Now you'll apply a red-to-green gradient along a 90 degree line to the first marker.

First, in the `.red` CSS rule, set the `background` property to `linear-gradient()`, and pass it the value `90deg` as the `gradientDirection`.

---

### Step 48
As you can see, the `linear-gradient` function produced a smooth red-green gradient. While the `linear-gradient` function needs a minimum of two color arguments to work, it can accept many color arguments.

Use the `rgb` function to add pure blue as the third color argument to the `linear-gradient` function.

---

### Step 49
Color-stops allow you to fine-tune where colors are placed along the gradient line. They are used in the `linear-gradient` function to specify where a color ends and the transition to the next color begins. Either a percentage or a length value can be used to define the color-stop position.

For example, in this red-black gradient, the transition from red to black takes place at the 90% point along the gradient line, so red takes up most of the available space:

```css
linear-gradient(90deg, red 90%, black);
```

In the `linear-gradient` function, add a `75%` color stop after the first red color argument. Do not add color stops to the other colors arguments.

---

### Step 50
Now that you know the basics of how the `linear-gradient` function and color-stops work, you can use them to make the markers look more realistic.

In the `linear-gradient` function, set `gradientDirection` to `180deg`.

---

### Step 51
Next, set the color-stop for red to `0%`, the color-stop for green to `50%`, and the color-stop for blue to `100%`.

---

### Step 52
Now that the color-stops are set, you'll apply different shades of red to each color argument in the `linear-gradient` function. The shades on the top and bottom edges of the marker will be darker, while the one in the middle will be lighter, as if there's a light above it.

For the first color argument, which is currently pure red, update the `rgb` function so the value for red is `122`, the value for green is `74`, and the value for blue is `14`.

---

### Step 53
Now modify the second color argument in the `linear-gradient` function, which is currently pure green.

Update the `rgb` function so the value for red is `245`, the value of green is `62`, and the value of blue is `113`.

---

### Step 54
Finally, modify the third color argument in the `linear-gradient` function, which is currently pure blue.

Update the `rgb` function so the value for red is `162`, the value of green is `27`, and the value of blue is `27`.

---

### Step 55
The red marker is looking much more realistic. Now you'll do the same for the green marker, using a combination of the `linear-gradient` function and hex colors.

In the `.green` CSS rule, change the `background-color` property to `background`.

---

### Step 56
For this marker, you'll use hex color codes for your gradient.

Use the `linear-gradient` function and set `gradientDirection` to `180deg`. And for the first color argument, use a hex color code with the values `55` for red, `68` for green, and `0D` for blue.

---

### Step 58
That's looking better, but the bottom edge of the green marker needs to be darker to add a little more dimension.

In the same `linear-gradient` function, add a hex color code with the values `11` for red, `6C` for green, and `31` for blue as the third color argument.

---

### Step 59
Even without the color-stops, you might have noticed that the colors for the green marker transition at the same points as the red marker. The first color is at the start (0%), the second is in the middle (50%), and the last is at the end (100%) of the gradient line.

The `linear-gradient` function automatically calculates these values for you, and places colors evenly along the gradient line by default.

In the `.red` CSS rule, remove the three color stops from the `linear-gradient` function to clean up your code a bit.

---

### Step 60
If no `gradientDirection` argument is provided to the `linear-gradient` function, it arranges colors from top to bottom, or along a 180 degree line, by default.

Clean up your code a little more by removing the `gradientDirection` argument from both `linear-gradient` functions.

---

### Step 61
Now you'll apply a gradient to the blue marker, this time using the `hsl` function as color arguments.

In the `.blue` CSS rule, change the `background-color` property to `background`.

---

### Step 62
Use the `linear-gradient` function, and pass in the `hsl` function with the values `186` for hue, `76%` for saturation, and `16%` for lightness as the first color argument.

---

### Step 63
As the second color argument, pass in the `hsl` function with the values `223` for hue, `90%` for saturation, and `60%` for lightness.

---

### Step 64
And as the third color argument, pass in the `hsl` function with the values `240` for hue, `56%` for saturation, and `42%` for lightness.

---

### Step 65
Now that the markers have the correct colors, it's time to build the marker sleeves. Start with the red marker.

Inside the red marker `div` element, create a new `div` element and give it a class of `sleeve`.

---

### Step 66
Create a new CSS rule that targets the class `sleeve`. Set the `width` property to `110px`, and the `height` property to `25px`.

---

### Step 74
All HTML elements have borders, though they're usually set to `none` by default. With CSS, you can control all aspects of an element's border, and set the border on all sides, or just one side at a time. For a border to be visible, you need to set its width and style.

In the `.sleeve` CSS rule, add the `border-left-width` property with the value `10px`.

---

### Step 75
Borders have several styles to choose from. You can make your border a solid line, but you can also use a dashed or dotted line if you prefer. Solid border lines are probably the most common.

In the `.sleeve` CSS rule, add the `border-left-style` property with the value `solid`.

---

### Step 76
Your border should be visible now. If no color is set, black is used by default.

But to make your code more readable, it's better to set the border color explicitly.

In the `.sleeve` CSS rule, add the `border-left-color` property with the value `black`.

---

### Step 77
The `border-left` shorthand property lets you to set the left border's width, style, and color at the same time.

Here is the syntax:

```css
border-left: width style color;
```

In the `.sleeve` CSS rule, replace the `border-left-width`, `border-left-style`, and `border-left-color` properties with the `border-left` shorthand property. The values for the width, style, and color of the left border should be the same.

---

### Step 78
Your marker is looking good. But to make it look even more realistic, you can change the border style to double solid borders.

For the `border-left` shorthand property, change the border style value from `solid` to `double`.

---

### Step 67
To make the marker look more realistic, give the sleeve a transparent white color.

First, set the sleeve element's `background-color` to `white`.

---

### Step 68
<dfn>Opacity</dfn> describes how opaque, or non-transparent, something is. For example, a solid wall is opaque, and no light can pass through. But a drinking glass is much more transparent, and you can see through the glass to the other side.

With the CSS `opacity` property, you can control how opaque or transparent an element is. With the value `0`, or 0%, the element will be completely transparent, and at `1.0`, or 100%, the element will be completely opaque like it is by default.

In the `.sleeve` CSS rule, set the `opacity` property to `0.5`.

---

### Step 69
Another way to set the opacity for an element is with the <dfn>alpha channel</dfn>. Similar to the `opacity` property, the alpha channel controls how transparent or opaque a color is.

You've already set sleeve's opacity with a named color and the `opacity` property, but you can add an alpha channel to the other CSS color properties.

Inside the `.sleeve` rule, remove the `opacity` property and value.

---

### Step 70
You were using the `rgb` function to set colors. To add an alpha channel to an `rgb` color, use the `rgba` function instead.

The `rgba` function works just like the `rgb` function, but takes one more number from `0` to `1.0` for the alpha channel:

```css
rgba(redValue, greenValue, blueValue, alphaValue);
```

You can also use an alpha channel with `hsl` and `hex` colors. You will see how to do that soon.

In the `.sleeve` rule, use the `rgba` function to set the `background-color` property to pure white with 50% opacity.

---

### Step 71
Your sleeve is looking good, but it would look even better if it was positioned more toward the right side of the marker. One way to do that is to add another element before the sleeve to push it to the right.

Add a new `div` with the class `cap` before the sleeve `div` element.

---

### Step 72
Create a new CSS rule to target the class `cap`. In the new rule, set the `width` property to `60px`, and the `height` to `25px`.

---

### Step 73
It looks like your sleeve disappeared, but don't worry — it's still there. What happened is that your new cap `div` is taking up the entire width of the marker, and is pushing the sleeve down to the next line.

This is because the default `display` property for `div` elements is `block`. So when two `block` elements are next to each other, they stack like actual blocks. For example, your marker elements are all stacked on top of each other.

To position two `div` elements on the same line, set their `display` properties to `inline-block`.

Create a new rule to target both the `cap` and `sleeve` classes, and set `display` to `inline-block`.

---

### Step 46
You'll use the `rgb` function for the colors of this gradient.

In the `linear-gradient` function, use the `rgb` function to set the first color argument to pure red.

---

### Step 47
You won't see gradient yet because the `linear-gradient` function needs at least two color arguments to work.

In the same `linear-gradient` function, use the `rgb` function to set the second color argument to pure green.

---

### Step 57
For the second color argument, use a hex color code with the values `71` for red, `F5` for green, and `3E` for blue.

---

### Step 79
The black color of your border looks pretty harsh against the more transparent sleeve. You can use an alpha channel to lower the opacity of the black border.

For the `border-left` shorthand property, use the `rgba` function to set the color value to pure black with 75% opacity.

---

### Step 80
Awesome. Your red marker is looking good. Now all you need to do is add the caps and sleeves to your other markers.

Add a cap and sleeve to both the green and blue markers. You can just copy the `div` elements from the red marker and paste them into the other two markers.

---

### Step 81
The last thing you'll do is add a slight shadow to each marker to make them look even more realistic.

The `box-shadow` property lets you apply one or more shadows around an element. Here is basic syntax:

```css
box-shadow: offsetX offsetY color;
```

Here's how the `offsetX` and `offsetY` values work:

* both `offsetX` and `offsetY` accept number values in `px` and other CSS units
* a positive `offsetX` value moves the shadow right and a negative value moves it left
* a positive `offsetY` value moves the shadow down and a negative value moves it up
* if you want a value of zero (`0`) for any or both `offsetX` and `offsetY`, you don't need to add a unit. Every browser understands that zero means no change.

The height and width of the shadow is determined by the height and width of the element it's applied to. You can also use an optional `spreadRadius` value to spread out the reach of the shadow. More on that later.

Start by adding a simple shadow to the red marker.

In the `.red` CSS rule, add the `box-shadow` property with the values `5px` for `offsetX`, `5px` for `offsetY`, and `red` for `color`.

---

### Step 82
As you can see, you added a simple red shadow around your marker that's 5 pixels to the right, and 5 pixels down.

But what if you wanted to position your shadow on the opposite side? You can do that by using negative values for `offsetX` and `offsetY`.

Update the values for the `box-shadow` property, and set `offsetX` to `-5px`, and `offsetY` to `-5px`.

---

### Step 83
Notice that the edges of the shadow are sharp. This is because there is an optional `blurRadius` value for the `box-shadow` property:

```css
box-shadow: offsetX offsetY blurRadius color;
```

If a `blurRadius` value isn't included, it defaults to `0` and produces sharp edges. The higher the value of `blurRadius`, the greater the blurring effect is.

In the `.green` CSS rule, add the `box-shadow` property with the values `5px` for `offsetX`, `5px` for `offsetY`, `5px` for `blurRadius`, and `green` for `color`.

---

### Step 84
But what if you wanted to expand the shadow out further? You can do that with the optional `spreadRadius` value:

```css
box-shadow: offsetX offsetY blurRadius spreadRadius color;
```

Like `blurRadius`, `spreadRadius` defaults to `0` if it isn't included.

Practice by adding a 5 pixel shadow directly around the blue marker.

In the `.blue` CSS rule, add the `box-shadow` property with the values `0` for `offsetX`, `0` for `offsetY`, `0` for `blurRadius`, `5px` for `spreadRadius`, and `blue` for `color`.

---

### Step 85
Now that you're familiar with the `box-shadow` property you can finalize the shadows, starting with the one for the red marker.

In the `.red` CSS rule, update the values for the `box-shadow` property so `offsetX` is `0`,`offsetY` is `0`, `blurRadius` is `20px`, `spreadRadius` is `0`, and `color` is `red`. Remember that you don't need to add units to a zero value.

---

### Step 86
Next, update the `color` value of the red marker's `box-shadow` property.

Replace the named color with the `rgba` function. Use the values `83` for red, `14` for green, `14` for blue and `0.8` for the alpha channel.

---

### Step 87
The shadows for your green and blue markers will have the same position, blur, and spread. The only difference will be the colors.

In the `.green` and `.blue` CSS rules, update the values for the `box-shadow` properties so `offsetX` is `0`,`offsetY` is `0`, `blurRadius` is `20px`, and `spreadRadius` is `0`. Leave the colors as `green` and `blue` for now.

---

### Step 88
For the green marker's `box-shadow` property, replace the named color with a hex color code. Use the values `3B` for red, `7E` for green, `20` for blue, and `CC` for the alpha channel.

---

### Step 89
Finally, for the blue marker's `box-shadow` property, replace the named color with the `hsla` function. Use the values `223` for hue, `59%` for saturation, `31%` for lightness, and `0.8` for the alpha channel.

And with that, your set of colored markers is complete! Well done.

---

### Design a Set of Colored Boxes
In this lab, you'll practice using CSS colors by designing boxes.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should set the background color for `body` to `#f4f4f4`.
2. You should have a `div` with a class of `color-grid` to hold all your color elements.
3. You should have five `div` elements within the `.color-grid` element.
4. The five `div` elements should each have a class of `color-box` and `color#`, where `#` is the number of the order of that `div`. For example: `color1` for the first `div`, `color2` for the second, and so on.
5. The `.color-box` class should have a set `width` and `height` so your `div` elements are visible on the page.
6. The `.color1` element should have a `background-color` that uses hexadecimal color value.
7. The `.color2` element should have a `background-color` that uses an RGB color value.
8. The `.color3` element should have a `background-color` that uses a predefined (word) color value.
9. The `.color4` element should have a `background-color` that uses a HSL color value.
10. The `.color5` element should have a `background-color` set.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### CSS Colors Review


---

### CSS Colors Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

Which of these color systems cannot be used to set a color in CSS?

#### --distractors--

RGB

---

HSL

---

HEX

#### --answer--

CMYK

### --question--

#### --text--

What are the primary colors in color theory?

#### --distractors--

`Green`, `Blue`, `Purple`

---

`Orange`, `Green`, `Purple`

---

`Yellow`, `Green`, `Red`

#### --answer--

`Yellow`, `Blue`, `Red`

### --question--

#### --text--

Which type of color scheme uses colors that are opposite each other on the color wheel?

#### --distractors--

Analogous

---

Triadic

---

Monochromatic

#### --answer--

Complementary

### --question--

#### --text--

Which type of color scheme uses colors that are adjacent to each other on the color wheel?

#### --distractors--

Complementary

---

Triadic

---

Monochromatic

#### --answer--

Analogous

### --question--

#### --text--

What is the term for colors that are created by mixing equal parts of two primary colors?

#### --distractors--

Tertiary

---

Complementary

---

Analogous

#### --answer--

Secondary

### --question--

#### --text--

What is the default value of alpha in `rgba` if it's not specified?

#### --distractors--

`0` (completely transparent)

---

`2` (completely opaque)

---

`0.5` (half transparent)

#### --answer--

`1` (completely opaque)

### --question--

#### --text--

Which of the following is a valid hex color code?

#### --distractors--

`#12345G`

---

`#12ffg0`

---

`#12ffgg`

#### --answer--

`#ff12ff`

### --question--

#### --text--

How many hexadecimal characters are used to define a color in shorthand hex notation?

#### --distractors--

5

---

4

---

2

#### --answer--

3

### --question--

#### --text--

Which of these functions allows specifying the transparency of a color?

#### --distractors--

`rgb()`

---

`hsl()`

---

`alpha()`

#### --answer--

`rgba()`

### --question--

#### --text--

Which of the following hex codes represents a shade of red?

#### --distractors--

`#0000ff`

---

`#ffff00`

---

`#00ff00`

#### --answer--

`#ff0000`

### --question--

#### --text--

How many colors are required to create a valid CSS gradient?

#### --distractors--

At least 4.

---

Exactly 2.

---

Exactly 3.

#### --answer--

At least 2.

### --question--

#### --text--

Which is NOT a valid way to apply a `linear-gradient`?

#### --distractors--

```css
background: linear-gradient(to right, red, blue);
```

---

```css
background: linear-gradient(90deg, red, green, blue);
```

---

```css
background: linear-gradient(#F00, #00F);
```

#### --answer--

```css
background: linear-gradient(up, red, blue);
```

### --question--

#### --text--

What unit is used to express the lightness value in the `hsl` color model?

#### --distractors--

Degrees

---

Hex

---

Pixels

#### --answer--

Percent

### --question--

#### --text--

What does the `rgb()` function stand for?

#### --distractors--

`Red`, `Gray`, `Black`

---

`Radiant`, `Glow`, `Blend`

---

`Rendered`, `Graphic`, `Background`

#### --answer--

`Red`, `Green`, `Blue`

### --question--

#### --text--

What does the `hsl()` function stand for?

#### --distractors--

`Hue`, `Saturation`, `Luminosity`

---

`Hue`, `Shadow`, `Lightness`

---

`Hue`, `Shadow`, `Luminosity`

#### --answer--

`Hue`, `Saturation`, `Lightness`

### --question--

#### --text--

Which of these is a valid CSS named color?

#### --distractors--

`hsl(yellow)`

---

`rgb(red)`

---

`#blue`

#### --answer--

`gold`

### --question--

#### --text--

What is the maximum value allowed for a single color component in the `RGB` color system?

#### --distractors--

`200`

---

`500`

---

`128`

#### --answer--

`255`

### --question--

#### --text--

Which of these correctly uses one of the color models to set the background color?

#### --distractors--

```css
background: rgb(50%, 255, 155);
```

---

```css
background: #blue;
```

---

```css
background: #0I0I0I;
```

#### --answer--

```css
background: hsl(50, 50%, 50%);
```

### --question--

#### --text--

Which of these sets the opacity of the color?

#### --distractors--

```css
hsl(0, 20%, 30%, 50%)
```

---

```css
rgb(20, 30, 80, 0.5)
```

---

```css
rgba(20, 30, 80)
```

#### --answer--

```css
hsla(0, 20%, 30%, 50%)
```

### --question--

#### --text--

Which of the following is the correct way to give an element a top-to-bottom red-to-blue gradient background?

#### --distractors--

```css
background: radial-gradient(red, blue)
```

---

```css
background: radial-gradient(blue, red)
```

---

```css
background: linear-gradient(blue, red)
```

#### --answer--

```css
background: linear-gradient(red, blue)
```

## --quiz--

### --question--

#### --text--

What are the 3 secondary colors in color theory?

#### --distractors--

Blue, Orange, Yellow

---

Purple, Green, Yellow

---

Green, Orange, Pink

#### --answer--

Green, Orange, Purple

### --question--

#### --text--

What feelings do warm colors evoke?

#### --distractors--

Subtlety, Isolation, Loneliness

---

Clarity, Freshness, Cleanliness

---

Melancholy, Nonchalance, Frostiness

#### --answer--

Comfort, Warmth, Coziness

### --question--

#### --text--

Which type of color scheme uses colors that are equidistant from each other on the color wheel?

#### --distractors--

Complementary

---

Analogous

---

Monochromatic

#### --answer--

Triadic

### --question--

#### --text--

Which type of color scheme uses colors that are derived from the same base color?

#### --distractors--

Complementary

---

Analogous

---

Triadic

#### --answer--

Monochromatic

### --question--

#### --text--

What is the name of a circular diagram that shows how colors relate to each other?

#### --distractors--

Swatch Wheel

---

Color Picker

---

Shade Spiral

#### --answer--

Color Wheel

### --question--

#### --text--

Which of these is not a tertiary color?

#### --distractors--

Yellow-Green

---

Blue-Green

---

Blue-Violet

#### --answer--

Yellow-Blue

### --question--

#### --text--

What are the three primary colors of light?

#### --distractors--

Red, Yellow, Blue

---

Red, Green, Purple

---

Red, Green, Brown

#### --answer--

Red, Green, Blue

### --question--

#### --text--

What does the alpha value control in `rgba`?

#### --distractors--

Hue

---

Saturation

---

Intensity

#### --answer--

Transparency

### --question--

#### --text--

Which of these functions is a valid `hsl` function?

#### --distractors--

`hsl(0, 100%, 50)`

---

`hsl(0%, 100%, 50%)`

---

`hsl(0, 100%, 150%)`

#### --answer--

`hsl(0, 100%, 50%)`

### --question--

#### --text--

Which of these `hsl` functions represents the color black?

#### --distractors--

`hsl(255,100%,100%)`

---

`hsl(0,0%,100%)`

---

`hsl(283,0%,75%)`

#### --answer--

`hsl(255,100%,0%)`

### --question--

#### --text--

What is "hex code" short for?

#### --distractors--

Hexagonal code

---

Hexabinary code

---

Hexaglyphic code

#### --answer--

Hexadecimal code

### --question--

#### --text--

Which letters can be used in a hex code?

#### --distractors--

A-G

---

A-H

---

A-E

#### --answer--

A-F

### --question--

#### --text--

Which digits can be used in a hex code?

#### --distractors--

0-10

---

10-19

---

1-9

#### --answer--

0-9

### --question--

#### --text--

What’s the maximum hue value in an `hsl` color?

#### --distractors--

100

---

255

---

60

#### --answer--

360

### --question--

#### --text--

What’s the fourth value in the `hsla()` function?

#### --distractors--

Absorption

---

Aura

---

Aperture

#### --answer--

Alpha

### --question--

#### --text--

Linear gradients create a gradual blend across what type of line?

#### --distractors--

Curved

---

Circular

---

Perpendicular

#### --answer--

Straight

### --question--

#### --text--

What types of color codes can be used in a gradient?

#### --distractors--

Hex code and HSL

---

HSL and RGB

---

RGB and Hex code

#### --answer--

Any CSS color

### --question--

#### --text--

How many color stops can you have in one gradient?

#### --distractors--

Up to 2

---

Up to 3

---

Up to 5

#### --answer--

Unlimited

### --question--

#### --text--

Which of these is NOT a valid radial gradient?

#### --distractors--

`radial-gradient(circle, red, blue)`

---

`radial-gradient(circle, #33ff11, rgb(255,0,255))`

---

`radial-gradient(circle, #bbb123, blue, rgb(255,0,255))`

#### --answer--

`radial-gradient(45deg, red, blue)`

### --question--

#### --text--

Which of these is NOT a valid gradient?

#### --distractors--

`radial-gradient(circle, red, blue, green)`

---

`linear-gradient(80deg, red, #44bb23, rgba(200,255,0,0.5))`

---

`radial-gradient(circle, red, #1168ff, rgba(200,255,0,0.5), hsl(120,100%,50%))`

#### --answer--

`linear-gradient(30deg, blue, hsl(120%,100%,50%))`

---

## styling-forms

### What Are Some Best Practices for Styling Text Inputs?


---

### "When Should You Use appearance: none to Deal with Issues Styling Search Inputs and Checkboxes?"


---

### What Are Common Issues When Styling Special Input Elements?


---

### Step 1
In this workshop, you will learn how to style forms by designing a registration form.

All of the HTML boilerplate (`DOCTYPE`, `html`, `head`, and `body`) has been provided for you.

Within the `body`, add a heading to give context to the form by using an `h1` element with the text `Registration Form`.

---

### Step 2
Below the heading, use the following text within a paragraph element to encourage users to register:

```md
Please fill out this form with the required information
```

---

### Step 3
In previous lessons, you learned how to work with viewport units.

Remember that the `vh` unit stands for viewport height, and is equal to 1% of the `height` of the viewport. This makes it relative to the viewport height.

It is time to spruce the project up with some CSS. Begin by giving the `body` a `width` of `100%`, and a `height` of `100vh`.

---

### Step 4
Now, get rid of the horizontal scroll-bar, by setting the `body` default `margin` added by some browsers to `0`.

---

### Step 5
That is better. Now, make the background easy on the eyes, by changing the `background-color` of `body` to `#1b1b32`. Then, to see the text, change the `color` to `#f5f6f7`.

---

### Step 6
As suggested by the title, you are creating a form. So, after the `p` element, insert a `form` with an `action` attribute targeting `https://register-demo.freecodecamp.org`.

---

### Step 8
As the form will have three distinct sections, add three `fieldset` elements within the `form` element.

---

### Step 9
The first `fieldset` will hold name, email, and password fields. Start by adding four `label` elements to the first `fieldset`.

---

### Step 10
Add the following text to the `label` elements:

- `Enter Your First Name:`
- `Enter Your Last Name:`
- `Enter Your Email:`
- `Create a New Password:`

---

### Step 11
In previous lessons, you learned how to work with `rem` units. Remember that `rem` unit stands for root `em`, and is relative to the font size of the `html` element.

As `label` elements are inline by default, they are all displayed side by side on the same line, making their text hard to read.

To make them appear on separate lines, add `display: block` to the `label` element, and add a `margin` of `0.5rem 0`, to separate them from each other.

---

### Step 12
Nest an `input` element within each `label`. Be sure to add each `input` after the `label` text, and include a space after the colon.

---

### Step 14
Specifying the `type` attribute of an `input` element is important for the browser to know what kind of data it should expect. If the `type` is not specified, the browser will default to `text`.

Give the first two `input` elements a `type` attribute of `text`, the third a `type` attribute of `email`, and the fourth a `type` attribute of `password`.

The `email` type only allows emails with a `@` and a `.` in the domain.
The `password` type obscures the input, and warns if the site does not use HTTPS.

---

### Step 15
The first `input` element with a `type` of `submit` is automatically set to submit its nearest parent `form` element.

To handle the form submission, after the last `fieldset` element add an `input` element with the `type` attribute set to `submit` and the `value` attribute set to `Submit`.

---

### Step 16
At this point, you should be able to submit the form. However, you might notice not much happens.

To make the form more interactive, add the `required` attribute to the `input` elements in the first `fieldset`.

Now, if you try to submit the form without filling in the required fields, you will see an error message.

---

### Step 17
Certain `type` attribute values come with built-in form validation. For example, `type="email"` requires that the value be a valid email address.

Add custom validation to the password `input` element, by adding a `minlength` attribute with a value of `8`. Doing so prevents inputs of less than 8 characters being submitted.

---

### Step 18
With `type="password"` you can use the `pattern` attribute to define a regular expression that the password must match to be considered valid.

Add a `pattern` attribute to the password `input` element to require the input match: `[a-z0-5]{8,}`

The above is a regular expression which matches eight or more lowercase letters or the digits `0` to `5`. Then, remove the `minlength` attribute, and try it out.

---

### Step 19
Let us go to the next part of the registration form. This section will ask for the type of account the user is opening.

Start by adding two `label` elements to the second `fieldset`.

---

### Step 20
Users will be able to choose whether their account is for `Personal` or `Business` purposes.

To do this, within each of the first two `label` elements, add one `input` element with `type="radio"`.

---

### Step 21
Within each corresponding `label` element, and immediately after the `input` element, add a space and add the following text:

```md
Personal
Business
```

---

### Step 22
You only want one radio input to be selectable at a time. However, the form does not know the radio inputs are related.

To relate the radio inputs, give them the same `name` attribute with a value of `account-type`. Now, it is not possible to select both radio inputs at the same time.

---

### Step 24
Currently users can submit the form without checking the radio inputs. Although you previously used the `required` attribute to indicate that an input is required, it won't work in this case because adding `required` to both inputs will convey the wrong information to users.

To solve this, you can provide context of what is needed by adding a `legend` element with text `Account type (required)` before the `label` elements within the second `fieldset`. Then add the `checked` attribute to the `Personal` input to ensure the form is submitted with the required data in it.

---

### Step 27
Add an anchor element with the text `Read our terms and conditions` before the newly added `label`. Set the `href` to:

```md
https://www.freecodecamp.org/news/terms-of-service/
```

Then add the text `I accept the terms and conditions` immediately after the input element in the label.

---

### Step 28
Moving on to the final `fieldset`. What if you wanted to allow a user to upload a profile picture?

Well, the `input` type `file` allows just that. Add a `label` with the text `Upload a profile picture: `, and nest an `input` accepting a file upload.

---

### Step 29
Add another `label` after the first, with the text `Input your age (years): `. Then, nest an `input` with the `type` of `number`.

Next, add a `min` attribute to the `input` with a value of `13` because users under the age of 13 should not register. Also, users probably will not be over the age of 120; add a `max` attribute with a value of `120`.

Now, if someone tries to submit the form with values outside of the range, a warning will appear, and the form will not submit. Give it a try.

---

### Step 30
Adding a dropdown to the form is easy with the `select` element. The `select` element is a container for a group of `option` elements, and the `option` element acts as a label for each dropdown option. Both elements require closing tags.

Start by adding a `select` element below the last `label` element. Then nest 5 `option` elements within the `select` element.

---

### Step 31
Nest the `select` element (with its `option` elements) within a `label` element with the text `How did you hear about us?`. The text should come before the `select` element.

---

### Step 32
The dropdown options are currently empty. To give them content, add the following text to each subsequent `option` element:

```md
(select one)
freeCodeCamp News
freeCodeCamp YouTube Channel
freeCodeCamp Forum
Other
```

---

### Step 33
Submitting the form with an option selected would not send a useful value to the server. Because of that, each `option` element needs a `value` attribute. Without this attribute, the text content of the `option` will be submitted to the server.

Give the first `option` a `value` of `""`, and the subsequent `option` elements `value` attributes from `1` to `4`.

---

### Step 34
The `textarea` element acts like an `input` element of type `text`, but comes with the added benefit of being able to receive multi-line text, and an initial number of text rows and columns.

Users will be able to register with a bio. Add a `label` with the text `Provide a bio:` at the end of the `fieldset`. Add a `textarea` element inside the `label` element. Note that the `textarea` requires a closing tag.

---

### Step 36
The `textarea` appears too small. To give it an initial size, you can add the `rows` and `cols` attributes.

Add an initial size of `3` rows and `30` columns.

---

### Step 37
To give Campers an idea of what to put in their bio, the `placeholder` attribute is used. The `placeholder` accepts a text value, which is displayed until the user starts typing.

Give the `textarea` a `placeholder` of `I like coding on the beach...`.

---

### Step 38
With form submissions, it is useful, and good practice, to provide each submittable element with a `name` attribute. This attribute is used to identify the element in the form submission.

Except for the two `radio` inputs (which you have already named), give each submittable element a unique `name` attribute of your choosing.

---

### Step 39
The HTML for the registration form is finished. Now, you can spruce it up a bit.

Start by changing the font to `Tahoma`, and the font size to `16px` in the `body`.

---

### Step 40
Center the `h1` and `p` elements by giving them a `margin` of `1em auto`. Then, align their text in the `center` as well.

---

### Step 41
Center the `form` element, by giving it a `margin` of `0 auto`. Then, fix its size to a maximum width of `500px`, and a minimum width of `300px`. In between that range, allow it to have a `width` of `60vw`.

---

### Step 42
During development, it is useful to see the `fieldset` default borders. However, they make the content appear too separated.

Remove the `border`, and add `2rem` of padding only to the top and bottom of each `fieldset`. Be sure to remove the `padding` from the left and right.

---

### Step 43
To give the `fieldset` elements a bit of separation, select them and give them a `border-bottom` of `3px solid #3b3b4f`.

---

### Step 45
It would be nicer to have the `label` text appear above the form elements.

Select all `input`, `textarea`, and `select` elements, and make them take up the full width of their parent elements.

Also, add `10px` of `margin` to the top of the selected elements. Set the other margins to `0`.

---

### Step 46
For the second `fieldset`, you want the `input` and `label` text to appear on the same line.

Start, by giving the `input` elements in the second `fieldset` a class of `inline`.

---

### Step 47
Select only the `.inline` elements, and give them `width` of `unset`. This will remove the earlier rule which set all the `input` elements to `width: 100%`.

---

### Step 48
Add some space between the `.inline` elements and the `label` text, by giving a right `margin` of `0.5em`. Also, set all the other margin to `0`.

---

### Step 49
If you look close enough, you will notice the `.inline` elements are too high on the line.

To combat this, set the `vertical-align` property to `middle`.

---

### Step 50
To make the `input` and `textarea` elements blend in with the background theme, set their `background-color` to `#0a0a23`. Then, give them a `1px`, `solid` border with a color of `#0a0a23`.

---

### Step 51
Currently, if you type in the `input` or `textarea` elements, you will not be able to see the text. Also, their height is too small to be easy to use.

Fix this by setting the `color` to `#ffffff`, and setting their `min-height` to `2em`.

---

### Step 52
You want the `select` element to remain with a white background, but now it is not getting the same `min-height` as the `input` and `textarea` elements.

Move the `min-height` property and value so that all three element types have the same `min-height` value, and the `select` element still has a white background.

---

### Step 53
To style the submit button, you can use an _attribute_ selector, which selects an element based on the given attribute value. Here is an example:

```css
input[name="password"]
```

The above selects `input` elements with a `name` attribute value of `password`.

Now, use the attribute selector to style the submit button with a `display` of `block`, and a `width` of `60%`.

---

### Step 54
With a `display` of `block` the submit button sits flush against the left edge of its parent.

Use the same technique used to center the `form` to center the submit button.

---

### Step 55
To make the submit button look more in line with the rest of the form, give it the same `height` as the other fields (`2em`). Also, increase the `font-size` to `1.1rem`.

---

### Step 56
To make the submit button appear more distinct, give it a `background-color` of `#3b3b4f`, and a `border-color` of `white`.

---

### Step 57
Lastly, for the submit button, you want to separate it from the `fieldset` above, and adjust its width to never be below `300px`.

Change the `margin` property to include `1em` on the top and bottom, while leaving the right and left margins set to `auto`. Then set the width as described above.

---

### Step 58
Most browsers inject their own default CSS properties and values for different elements. If you look closely, you might be able to notice the file `input` is smaller than the other text `input` elements. By default, a `padding` of `1px 2px` is given to `input` elements you can type in.

Using another attribute selector, style the `input` with a `type` of `file` to be the same padding as the other `input` elements.

---

### Step 59
Speaking of `padding`, the submit button is sitting at the bottom of the `form` element. Add `2em` of `padding` only to the bottom of the `form`.

---

### Step 60
Make the `input` for the terms and conditions `inline` by adding the appropriate class in the HTML.

---

### Step 44
The border of the last `fieldset` element looks a little out of place. 

In previous lessons, you learned how to work with the `last-of-type` CSS pseudo-class like this: 

```css
p:last-of-type { }
```

That will select the last `p` element.

Create a new selector that targets the last `fieldset` element and set its `border-bottom` to `none`.

---

### Step 13
Following accessibility best practices, link the `input` elements and the `label` elements together using the `for` attribute.

Use `first-name`, `last-name`, `email`, and `new-password` as values for the respective `id` attributes.

---

### Step 26
You need to confirm that the user has read the terms and conditions.

Add a `label` element. Inside the newly created `label` element add an `input` element and set the `type` attribute to `checkbox`. Make this `input` element `required` so users can not sign up without agreeing to the terms and conditions.

Add an `id` and `for` attribute with the value `terms-and-conditions` to the elements for accessibility.

---

### Step 35
Link the applicable form elements and their `label` elements together.

Use `profile-picture`, `age`, `referrer`, and `bio` as values for the respective `id` attributes.

---

### Step 7
The `method` attribute specifies how to send form-data to the URL specified in the `action` attribute. The form-data can be sent via a `GET` request as URL parameters (with `method="get"`) or via a `POST` request as data in the request body (with `method="post"`).

Set the `method` attribute to send your form data via a `POST` request.

**NOTE**: You will learn more about the `GET` and `POST` methods in the upcoming lessons and workshops.

---

### Step 25
Follow accessibility best practices by linking the `input` elements and the `label` elements in the second `fieldset`.

Use `personal-account`, and `business-account` as values for the respective `id` attributes.

---

### Step 61
Lastly, change the text color of the `terms and conditions` link element to `#dfdfe2` by adding a new selector in the CSS.

Well done! You have completed the final part of the _Registration Form_ workshop.

---

### Step 23
The radio buttons don't yet have a value assigned to them. Therefore, the POST request made through the form will not register which option is selected.

To make the request completely robust, add `value` attribute to both the radio buttons with the values `personal` and `business` respectively.

---

### Design a Contact Form
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab. 

**User Stories:**

1. You should have a `div` with a class of `form-container` to hold your form.

2. You should have a `form` element within the `.form-container` element.

3. Within the `form` element, you should have the following elements and input fields:

   - An `h2` element with some text.
   - A text input field for the name with the `type` set to `text` and `id`, `name`, `required` attributes.
   - An email input field with the `type` set to `email` and `id`, `name`, `required` attributes.
   - A textarea for the message with `id`, `name`, and the `required` attribute.
   - A `button` element with the text `"Submit"` and a `type` attribute of `submit`.

4. Each `input` and `textarea` elements should have their corresponding `label` element with a `for` attribute set to the element's `id`.

5. The `.form-container` element should have a background color, and have values for `border-radius`, `padding`, and `width`.

6. The `label` elements should have a margin and a font color.

7. The `input` and `textarea` elements should have values for:
   
   - `width`.
   - `padding`.
   - Margin on the bottom.

8. The `button` element should have a:
   
   - Background color
   - Font size apart from the default.

9.  The button should have a hover effect that changes the background color.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### Step 1
In this workshop, you will practice styling checkboxes by building a game settings panel.

All of the HTML boilerplate (`DOCTYPE`, `html`, `head` and `body`) has been provided for you.

Within the `body`, create a `div` element with an `h1` element nested inside. Give the `h1` element the text `Game Settings`

---

### Step 2
Immediately after your `h1` element, create four `label` elements.

Inside of each of the `label` elements, create an `input` element with the `type` attribute set to `"checkbox"`.

After each `input` element, give your `label` elements the following texts, in order: `Sound Effects`, `Background Music`, `Hard Mode`, and `Haptic Feedback`.

---

### Step 4
Now that the body has been styled, you are going to create a container card for the Game Settings panel. 

To start, add a class of `settings-card` to your `div` element.

---

### Step 7
Now create an `h1` selector and set the `text-align` property with a value of `center`. This will center your `h1` elements.

---

### Step 9
Next up, you are going to enlarge the checkboxes for better visibility.

Begin by setting up a selector for `input`, but specifically targeting your `[type="checkbox"]`.

Within your selector, set the `width` and the `height` to `20px`. This makes it larger than it was before.

And to conform with your `cursor` setting that was set on the labels, add `cursor` and assign the value of `pointer` to it. After that, when you hover over the checkboxes it will display a pointer.

---

### Step 10
Now you are going to remove the default checkbox that is applied by browsers. Inside of your `input[type='checkbox']` selector, add `appearance` with a value of `none`.

Setting the `appearance` property to `none` will clear the appearance the browser applies to checkboxes, allowing you to show the style you want.

After doing so, since the checkbox won't be visible anymore, set a `border` with `2px` thickness, a `solid` style, and a hex code of `#f1be32`.

---

### Step 11
Now that you can see your checkbox again, you are going to finalize some styling options for it. Give them a rounded edge by adding a `border-radius` of `4px` to your `input[type="checkbox"]` selector.

Then give it a `background-color` of `white` to make the center of your checkbox stand out from the background of the container.

Since you are going to be setting up a custom transition for when a user clicks on the checkboxes, set a `transition` with the value of `all` and `0.3s` so that the transition happens smoothly over 0.3 seconds rather than instantly.

---

### Step 13
In a previous lesson, you learned about pseudo-classes and pseudo-elements in CSS. You are going to apply that knowledge now by creating a combined type selector with pseudo-class selector.

First, start with the format for the type selector by setting it as `input[type="checkbox"]` and appending `:checked` to the end of it.

Next, give it a `background-color` with the value of `#f1be32`.

And lastly, set the `border-color` to have a value of `#e2a60d`.

---

### Step 14
Now that your checkboxes change color when the user clicks them, you are going to apply some styling to make it a little more obvious that the checkbox has been selected.

CSS pseudo-classes can be chained. You can add one pseudo-class or pseudo-element after another to target elements that meet multiple conditions.

Create a new selector for `input[type="checkbox"]`. Add the `:checked` pseudo-class followed by the `::after` pseudo-element. This allows you to add a visual indicator when the checkbox is checked.

Next, add `content` with the value of `"✓"`.

---

### Step 6
Within your `.settings-card` selector set the `margin` property to `auto`.

Setting the `margin` property to `auto` automatically adjusts the margins of an element to evenly distribute the remaining space in its container, commonly used to center block-level elements horizontally.

And last, set a `text-align` property with the value of `left`. This will align the inline content, such as text, to the left side of its containing element.

---

### Step 3
Now you will begin sprucing the page up with some CSS styling. Begin by creating the `body` selector.

Set the `body` to have a `height` property with a value of `100vh` and a `background-color` property with a value of `#f0f0f0`.

The `height` of `100vh` makes the `body` take up the full height of the browser viewport, while the light gray background color provides a subtle base for the page.

Lastly, set a `text-align` property with the value of `center`. This will center all inline-content contained within the page unless a child element overrides it with its own alignment.

---

### Step 15
In the declaration for the `input[type="checkbox"]:checked::after` selector, set the `display` to `block`. Setting your `display` property as `block` makes the element a block-level element, meaning that it takes up the full width of its container and starts on a new line, allowing you to control its width, height, and spacing more easily.

Next, set `text-align` to `center`. This will center the inline content (like text, or inline elements) horizontally within the block. The block will still take up the full width of its container but everything inside it will be aligned to the center.

---

### Step 8
You need some spacing between the checkboxes and the labels. Begin by using the selector for `label` in your CSS and set a `display` property of `block`.

Next, set a `margin` property of `8px auto` to add vertical spacing between elements. This will create consistent spacing above and below each element, helping to separate content and improve readability.

Finally, set the `cursor` property to `pointer` on the `label` elements. This will change the cursor to a hand icon when a user hovers over a `label`, signaling that the element is clickable and improving the overall user experience.

---

### Step 16
To finish setting up the visual effect of your checkbox, set the `font-weight` property with a value of `bold`. This will increase the visibility of the checkmark.

Now that this is easier to see, change the `color` to a value of `white`. This is going to change the color of the checkmark within the checkbox when it is checked.

Lastly, alter the `line-height` to a value of `20px`.

With that, you have completed the game settings panel!

---

### Step 12
Next, set a `vertical-align` property with a value of `middle`.

The `vertical-align` property controls how `inline` or `inline-block` elements align vertically with the surrounding text or other inline elements. It's often used to adjust the vertical position of elements like images, icons, or text within a line.

Then finalize your checkbox with a `margin` property of `15px`.

---

### Step 5
Now it is time to style the `settings-card` container. Create a class selector for `settings-card`.

This will be where all of your formatting for the container will go. Set the `max-width` to `250px` to define the overall size of your container.

Next, set your `padding` to `20px` so that your content has space between it and the border of the container.

After this, create a rounded edge by setting your `border-radius` to `10px`.

Then set a `box-shadow` with the values of `0 2px 6px rgba(0,0,0,0.2)`. This will create a subtle "lifted" look that will create depth for the container.

---

### Design a Feature Selection Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. Your page should have an `h1` element with the text `Feature Selection`.
2. Your page should have a `div` element with the class `feature-card-container`.
3. Your page should have at least two `label` elements each with the class `feature-card` inside the `div`.
4. Each of your `label` elements should have label text and an `input` element of type `checkbox` in them.
5. Create a selector that targets the checkboxes, and apply the following styling:
    - All of your checkbox elements should be set to `appearance: none;` in your CSS.
    - All of your checkbox elements should have a border width, color and style of your choosing.
6. When the checkbox is checked, it should display a checkmark `✓` in the center of the checkbox.
7. When the checkbox is checked, the background color of the checkbox should change to a color of your choosing.
8. When the checkbox is checked, the border color of the checkbox should change to a color of your choosing.

**Note:** Be sure to link your CSS file in your HTML.

---

### Styling Forms Review
## Best Practices for Styling Inputs

- **Styling Inputs**: As with all text elements, you need to ensure the styles you apply to text inputs are accessible. This means the font needs to be adequately sized, and the color needs to have sufficient contrast with the background. Input elements are also focusable. When you are editing your styles, you should take care that you preserve a noticeable indicator when the element has focus, such as a bold border.

## Using `appearance: none` for Inputs

- **`appearance: none`**: Browsers apply default styling to a lot of elements. The `appearance: none` CSS property gives you complete control over the styling, but comes with some caveats. When building custom styles for input elements, you will need to make sure focus and error indicators are still present.

## Commons Issues Styling `datetime-local` and `color` Properties

- **Common Issues**: These special types of inputs rely on complex pseudo-elements to create things like date and color pickers. This presents a significant challenge for styling these inputs. One challenge is that the default styling is entirely browser-dependent, so the CSS you write to make the picker look the way you intend may be entirely different on another browser.

# --assignment--

Review the Styling Forms topics and concepts.

---

### Styling Forms Quiz
To pass the quiz, you must correctly answer at least 9 of the 10 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What is a common issue for styling the `datetime-local` input type?

#### --distractors--

It does not work with the `float` property.

---

It is impossible to make it responsive.

---

It does not work with `rem` units.

#### --answer--

The input format is different across browsers.

### --question--

#### --text--

Which of the following is considered best practice for styling text inputs?

#### --distractors--

Text input font sizes need to be set with `em` units and colors should be a light gray.

---

Text input sizes should only use dark green borders on focus and the text color should be dark gray.

---

Text input font colors need to be light colors and the size should only be set using the `px` unit.

#### --answer--

Text input fonts need to be adequately sized, and the color needs to have sufficient contrast with the background.

### --question--

#### --text--

How should the error state styling relate to the focus state styling?

#### --distractors--

They should be identical for consistency.

---

The error state should be less visible to avoid alarming users.

---

The error state should be animated while the focus state should be static.

#### --answer--

The error state should be distinct from the focus state.

### --question--

#### --text--

What is a best practice for styling inputs in a focused state?

#### --distractors--

It is important to use only light gray borders for focused inputs.

---

It is important to only use dark red borders for focused inputs.

---

It is important to remove any noticeable indicator.

#### --answer--

It is important to preserve a noticeable indicator.

### --question--

#### --text--

What is a best practice for styling inputs in an error state?

#### --distractors--

Increase the font size for the input text to `3rem`.

---

Set the input to `display: none;` so it is removed from the page.

---

Set the input to be disabled so users can no longer interact with it.

#### --answer--

Provide a visual indicator with a message so users know that something is incorrect and needs to be fixed.

### --question--

#### --text--

Why is it important to use descriptive placeholder text in form inputs?

#### --distractors--

It helps to pre-fill the form for the user.

---

It automatically validates the input as the user types.

---

It hides the input label, reducing visual clutter.

#### --answer--

It provides users with guidance on the expected input format.

### --question--

#### --text--

What is WebKit?

#### --distractors--

It is a browser engine that ensures that there are no validation errors in your CSS.

---

It is a special CSS property used in CSS Grid.

---

It is a special CSS property used in CSS flexbox.

#### --answer--

It is a browser engine that displays webpages.

### --question--

#### --text--

When is it appropriate to use `appearance: none;` for form elements?

#### --distractors--

To remove form elements completely from the DOM and page.

---

To hide form elements from those who use assistive technologies like screen readers.

---

To remove only default colors that are applied to the form elements and use your own.

#### --answer--

To remove some of the default styles that are applied to the form elements.

### --question--

#### --text--

What are some considerations when working with `appearance: none;` on form elements?

#### --distractors--

It is important to preserve hovered and submit indicators on interactive elements.

---

It is important to only use `appearance: none;` when you want to apply different styles for the Safari browser.

---

It is important to use `appearance: none;` when you need to completely remove a form element from the page.

#### --answer--

It is important to preserve focus and error indicators on interactive elements.

### --question--

#### --text--

Which type of form elements are commonly styled using `appearance: none;` to remove their default look?

#### --distractors--

`label` elements.

---

`div` elements.

---

`span` elements.

#### --answer--

`input` elements.

---

## css-box-model

### What Is Overflow in CSS, and How Does It Work?


---

### What Is the CSS Transform Property, and How Does It Work?


---

### What Is the CSS Box Model, and How Does It Work?
The CSS box model is a fundamental concept for web development. It defines how HTML elements are structured and positioned. If you understand this model you will be able to control the size, spacing and appearance of the elements on your website.

In the CSS box model, every element is surrounded by a box. This box consists of four elements: the content area, the padding, the border, and the margin. 

The content area is the innermost part of the box. It's the space that contains the actual content of an element like text or images.

The padding is the area immediately after the content area. It's the space between the content area and the border of an element. With the padding you can add space around the content to improve it's readability. You can set different values for the top, right, bottom and left padding with the `padding` property.  

This is an example with the `padding` shorthand property, where we set the top padding to fifteen pixels, the right padding to five pixels, the bottom padding to two pixels and the left padding to eight pixels:  

```css
padding: 15px 5px 2px 8px;
```

The border is the outer edge or outline of an element in the CSS box model. It's the visual boundary of the element. You can customize the border style, width, color and other properties using the `border` property. Here's an example where we set the border to a width of five pixels, the style to solid and a color of blue: 

```css
border: 5px solid blue;
```

If you omit a value the default property of that value will be used. That's `medium` for the width, `none` for the style and the current color for the color. 

You can set these three properties directly in the shorthand `border` property if you want all sides to be exactly the same. But if you want to assign a different style to each side you can use the `border-width`, `border-style` and `border-color` properties. 

```css
border-width: 2px 4px 7px 12px;
border-style: dashed solid solid dashed;
border-color: blue red green black;
```

You can write up to four values for each one of these properties. They will be applied in a clockwise sequence starting from the top. If you only write one value it will be applied to all four sides.

Finally, the margin is the space outside the border of an element. It determines the distance between an element and other elements around it. You can set different margin values for the top, right, bottom and left sides of the element using the `margin` property.  

So in this example the top margin is three pixels, the right margin is twelve pixels, the bottom margin is nine pixels and the left margin is seven pixels:  

```css
margin: 3px 12px 9px 7px;
```

These four components are essential for calculating the total width and height of an element.

In the next few lessons, you will learn more about how this is handled by the browser and how you can customize it. The CSS box model is a fundamental concept for web development.  

Understanding how these components interact and contribute to an element's dimensions is essential for implementing web designs.

# --questions--

## --text--

Which component of the CSS box model defines the space between the content area and the border?

## --answers--

`margin`

### --feedback--

Think about the area surrounding the content.

---

`padding`

---

`content`

### --feedback--

Think about the area surrounding the content.

---

`border`

### --feedback--

Think about the area surrounding the content.

## --video-solution--

2

## --text--

Which component of the CSS box model specifies the space outside the border of an element?

## --answers--

`margin`

---

`padding`

### --feedback--

Think about the space between an element and its neighboring elements.

---

`content`

### --feedback--

Think about the space between an element and its neighboring elements.

---

`border`

### --feedback--

Think about the space between an element and its neighboring elements.

## --video-solution--

1

## --text--

Which component of the CSS box model creates a visible outline around an element?

## --answers--

`margin`

### --feedback--

Think about the visible edge of an element.

---

`padding`

### --feedback--

Think about the visible edge of an element.

---

`content`

### --feedback--

Think about the visible edge of an element.

---

`border`
 
## --video-solution--

4

---

### What Is Margin Collapsing, and How Does It Work?


---

### What Is the Difference Between content-box and border-box?


---

### What Is a CSS Reset, and What Are Some Common Examples?


---

### What Is the CSS Filter Property, and What Are Common Examples?


---

### Step 1
Begin your project by adding an `img` element with a `src` of `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-1.png` within the `body` element.

---

### Step 2
In previous lessons about the CSS box model, you learned that every HTML element is treated as a box with four areas.

Imagine you receive a box from your favorite online retailer — the content is the item in the box, or in your case, a header, paragraph, or image element.

Change the `src` attribute in the `<img>` from `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-1.png` to `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-2.png`.

---

### Step 3
The content is surrounded by a space called padding, similar to how bubble wrap separates an item from the box around it.

Think of the border like the cardboard box your item was shipped in.

Change the `src` attribute to `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-3.png`

---

### Step 4
Margin is the area outside of the box, and can be used to control the space between other boxes or elements.

Here the bottom element has a larger top margin, pushing it further down the page.

Now that you quickly reviewed the CSS box model, it's time to get started on the Rothko painting.

Remove the `img` element.

---

### Step 5
Add a `div` element in the `body`.

Set the `class` attribute equal to `canvas`.

This will act as the canvas for your painting.

---

### Step 6
Before you can start styling the `div` you added, you need to link your CSS to your HTML.

Add a `link` element to link your `styles.css` file. Set the `href` to `styles.css`, and remember to set the `rel` attribute to `stylesheet`.

---

### Step 7
Time for CSS.

Even though your `<div>` has no text, it's still treated as a box with content.
Write a CSS rule that uses the `.canvas` class selector and set its `width` to 500 pixels.
Here's a CSS rule that sets the width of the class `card` to 300 pixels:

```css
.card {
  width: 300px;
}
```

---

### Step 8
Add the `height` property with the value `600px` to your `.canvas` rule.

---

### Step 9
Change the `background-color` of the canvas to `#4d0f00`.

---

### Step 10
Every painting needs a frame.

Wrap the `.canvas` element in another `div`. Give that `div` the `frame` class.

---

### Step 11
Write a new rule using the `.frame` class selector.

Use the `border` shorthand declaration to give the `.frame` element a solid, black border with a width of `50px`.

---

### Step 12
The frame is much too wide.

In `.frame`, set its `width` to 500 pixels.

---

### Step 13
Use padding to adjust the spacing within an element.

In `.frame`, use the `padding` shorthand property to increase the space between the `.frame` and `.canvas` elements by `50px`. The shorthand will increase space in the top, bottom, left, and right of the element's border and canvas within.

---

### Step 14
Use margins to adjust the spacing outside of an element.

Using the `margin` property, give the `.frame` element vertical margin of `20px`, and horizontal margin of `auto`. This will move the frame down 20 pixels and horizontally center it on the page.

---

### Step 15
Add a new `div` element inside of your `.canvas` element.

Give the new `div` the `class` attribute with a value of `one`. This will be your first rectangle.

---

### Step 16
Write a new rule that targets `.one` and set its `width` to 425 pixels.

---

### Step 17
Now set the `height` for `.one` to 150 pixels.

---

### Step 18
Set the `background-color` of `.one` to `#efb762`.

---

### Step 19
Use margins to position the `.one` element on the canvas.

Add the shorthand `margin` property with a vertical margin of `20px` and a horizontal margin of `auto`.

---

### Step 20
Now `.one` is centered horizontally, but its top margin is pushing past the canvas and onto the frame's border, shifting the entire canvas down 20 pixels.

Add `padding` of `1px` to the `.canvas` element to give the `.one` element something solid to push off of.

---

### Step 21
Adding 1 pixel of padding to the top, bottom, left, and right of the canvas changed its dimensions to 502 pixels x 602 pixels.

Replace the `padding` property with `overflow` set to `hidden` - changing the canvas back to its original dimensions.

---

### Step 22
Add another `div` with a `class` value of `two` just below your `one` element. This will be your second rectangle.

---

### Step 23
Create a new CSS rule using the `.two` selector and set its `width` to 475 pixels.

---

### Step 24
Set the `height` of the `.two` element to 200 pixels.

---

### Step 25
Set the `background-color` of the `.two` element to `#8f0401`.

---

### Step 26
Center the `.two` element by setting its `margin` to `auto`.

---

### Step 27
Create a new `div` with a `class` value of `three` right under the `.two` element. This will be your third rectangle.

---

### Step 28
You don't always have to use pixels when sizing an element.

Create a new rule, `.three`, and set its `width` to `91%`.

---

### Step 29
Set the `height` of `.three` to `28%`.

---

### Step 30
Change the `background-color` of `.three` to `#b20403`.

---

### Step 31
Center the `.three` element on the canvas by setting its `margin` to `auto`.

---

### Step 32
It's helpful to have your margins push in one direction.

In this case, the bottom margin of the `.one` element pushes `.two` down 20 pixels.

In the `.two` selector, use `margin` shorthand property to set top margin to `0`, horizontal margin to `auto`, and bottom margin to `20px`. This will remove its top margin, horizontally center it, and set its bottom margin to 20 pixels.

---

### Step 33
The colors and shapes of your painting are too sharp to pass as a Rothko.

Use the `filter` property to `blur` the painting by `2px` in the `.canvas` element.

Here's an example of a rule that add a 3px `blur`:

```css
p {
  filter: blur(3px);
}
```

---

### Step 34
Create a rule that targets both `.one` and `.two` and increase their `blur` effect by 1 pixel.

---

### Step 35
Increase the `blur` of `.three` by 2 pixels.

---

### Step 36
The rectangles are too small and their edges don't have the soft quality of a painting.

Increase the area and soften the edges of `.one` by setting its `box-shadow` to `0 0 3px 3px #efb762`.

---

### Step 37
Use the same `box-shadow` declaration for `.two`, but change the color from `#efb762` to `#8f0401`.

---

### Step 38
Add a `box-shadow` to `.three` with the values `0 0 5px 5px #b20403`.

---

### Step 39
The corners of each rectangle are still too sharp.

Round each corner of the `.one` element by 9 pixels, using the `border-radius` property.

---

### Step 40
Use the `border-radius` property on the `.two` selector, to set its top-left radius and bottom-right radius to `8px`, and top-right radius and bottom-left radius to `10px`.

---

### Step 41
The `border-radius` property accepts up to four values to round the top-left, top-right, bottom-right, and bottom-left corners.

Round the top-left corner of `.three` by 30 pixels, the top-right by 25 pixels, the bottom-right by 60 pixels, and bottom-left by 12 pixels.

---

### Step 42
Rotate each rectangle to give them more of an imperfect, hand-painted look.

Use the `transform` property on the `.one` selector to `rotate` it counter clockwise by 0.6 degrees.

---

### Step 43
Rotate the `.two` element clockwise by 0.4 degrees.

---

### Step 44
Rotate `.three` counter clockwise by 0.2 degrees.

With this final step, your Rothko painting is now complete.

---

### Build a Confidential Email Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `main` element with an `id` of `email`.
1. Your `#email` element should have `padding` of `50px`, a top margin of `50px`, a `width` of `500px`, and a `border` that's `2px`.
1. The total width of your `#email` element, including paddings and borders, should be `500px`.
1. You should have two `div` elements, one with an id of `confidential` and the other with an id of `top-secret`, within your `#email` element.
1. Your `#confidential` and `#top-secret` elements should have a `display` of `inline-block`.
1. Your `#confidential` and `#top-secret` elements should have a `padding`, a left margin, and a `border`.
1. The `#confidential` element should have the text `CONFIDENTIAL`.
1. The `#top-secret` element should have the text `TOP SECRET`.
1. Your `#confidential` and `#top-secret` elements should be rotated using a CSS transform.
1. You should have at least three paragraph elements within your `#email` element.
1. You should have at least three `span` elements with a class of `blurred`, within your paragraph elements.
1. You should have a `blurred` selector that blurs the element `3px` using a CSS filter.

---

### CSS Layouts and Effects Review


---

### CSS Layout and Effects Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What term is used in CSS to describe when an element's content exceeds the size of its container?

#### --distractors--

Underflow

---

Compression

---

Padding

#### --answer--

Overflow

### --question--

#### --text--

What is the default behavior of CSS when content overflows an element?

#### --distractors--

Hiding the content.

---

Clipping the content.

---

Resizing the content.

#### --answer--

Keeping the content visible.

### --question--

#### --text--

Why does CSS typically avoid hiding content when there is overflow?

#### --distractors--

To maintain the original layout and design.

---

To prevent performance issues in the browser.

---

To allow for better search engine optimization.

#### --answer--

To ensure all content is accessible to users.

### --question--

#### --text--

How can you handle vertical overflow in CSS by hiding content or displaying scrollbars?

#### --distractors--

Use `overflow-y: visible` to hide content and `overflow-y: auto` to always display scrollbars.

---

Use `overflow-y: collapse` to hide content and `overflow-y: expand` to display scrollbars.

---

Use `overflow-y: none` to hide content and `overflow-y: show` to display scrollbars.

#### --answer--

Use `overflow-y: hidden` to hide content and `overflow-y: scroll` to always display scrollbars.

### --question--

#### --text--

How can you specify different horizontal and vertical scrolling behaviors in CSS?

#### --distractors--

By using the `scroll-x` and `scroll-y` properties.

---

By specifying the same value for `overflow-x` and `overflow-y`.

---

By specifying two values for the `overflow` property, where the first value applies to `overflow-y` and the second value to `overflow-x`.

#### --answer--

By specifying two values for the `overflow` property, where the first value applies to `overflow-x` and the second value to `overflow-y`.

### --question--

#### --text--

What does the `transform` CSS property allow you to do?

#### --distractors--

Change the color and font style of an element.

---

Adjust the margin and padding of an element.

---

Modify the visibility and display of an element.

#### --answer--

Rotate, scale, skew, and translate an element.

### --question--

#### --text--

How does the `transform: translate(15px, 200px)` property modify an element?

#### --distractors--

It moves the element 15 pixels to the left and 200 pixels down from its original position.

---

It rotates the element 15 degrees in a clockwise direction.

---

It moves the element 15 pixels to the right and 200 pixels up from its original position.

#### --answer--

It moves the element 15 pixels to the right and 200 pixels down from its original position.

### --question--

#### --text--

What is the purpose of the CSS properties `overflow-x` and `overflow-y`?

#### --distractors--

They adjust the padding and margin of an element.

---

They set the background color and font style of an element.

---

They define the visibility and display properties of an element.

#### --answer--

They control the horizontal and vertical overflow of an element's content.

### --question--

#### --text--

What is the purpose of the `margin` property in CSS?

#### --distractors--

It defines the space between the content and the border of an element.

---

It defines the space between the border and the padding of an element.

---

It defines the width and height of an element.

#### --answer--

It defines the space around an element, outside of its border.

### --question--

#### --text--

What does the content area of an element represent in CSS?

#### --distractors--

It defines the margins and padding around the element.

---

It defines the thickness of the element's border.

---

It controls the visibility of the element on the page.

#### --answer--

It contains the actual content of the element, such as text, images, and videos.

### --question--

#### --text--

What is the difference between `content-box` and `border-box` in CSS?

#### --distractors--

`content-box` includes padding and border, while `border-box` includes only content dimensions.

---

Both `content-box` and `border-box` include only the border dimensions.

---

`content-box` is used for 2D elements, while `border-box` is used for 3D elements.

#### --answer--

`content-box` includes only content dimensions, while `border-box` includes content, padding, and border in the dimensions.

### --question--

#### --text--

What is the purpose of CSS resets?

#### --distractors--

To apply default styles to all elements for faster loading.

---

To minimize the size of CSS files by removing unused styles.

---

To optimize images and fonts for better performance.

#### --answer--

To remove default browser styling and ensure consistent styling across browsers.

### --question--

#### --text--

Which of the following is a common example of a CSS reset?

#### --distractors--

bootstrap.css

---

undo.css

---

restore.css

#### --answer--

normalize.css

### --question--

#### --text--

Which CSS property is used to apply changes such as rotation, scaling, and translation to elements?

#### --distractors--

`box-shadow`

---

`opacity`

---

`z-index`

#### --answer--

`transform`

### --question--

#### --text--

How is the total width of an element calculated in CSS when using the `border-box` value for the `box-sizing` property?

#### --distractors--

Total Width = Content Width + Border + Margin

---

Total Width = Content Width + Padding + Border + Margin

---

Total Width = Content Width

#### --answer--

Total Width = Content Width + Padding + Border

### --question--

#### --text--

What is the purpose of the `filter` property in CSS?

#### --distractors--

Changing the scale and rotation of an element.

---

Changing the background color and texture of an element.

---

Altering the size and position of an element.

#### --answer--

Modifying the visual appearance of an element by using various graphical effects.

### --question--

#### --text--

What does the CSS property `filter: grayscale(50%);` do to an element?

#### --distractors--

It increases the brightness of the element by 50%.

---

It decreases the contrast of the element by 50%.

---

It applies a sepia effect to the element.

#### --answer--

It applies a 50% grayscale effect to the element.

### --question--

#### --text--

What is the purpose of the `contrast()` function in CSS?

#### --distractors--

It adjusts the brightness of the image, where `0%` makes it black and `100%` makes it white.

---

It adjusts the contrast of the image, where `100%` makes it grey, `0%` has no effect, and values over `100%` increase contrast.

---

It adjusts the opacity of the image, where `0%` makes it transparent and `100%` makes it opaque.

#### --answer--

It adjusts the contrast of the image, where `0%` makes it grey, `100%` has no effect, and values over `100%` increase contrast.

### --question--

#### --text--

What is the purpose of the `hue-rotate()` function in CSS?

#### --distractors--

It changes the brightness of an image.

---

It rotates an image clockwise by a certain number of degrees.

---

It adjusts the saturation and contrast of an image.

#### --answer--

It applies a color shift, where the `angle` value defines the number of degrees to rotate around the color circle.

### --question--

#### --text--

What is margin collapsing in CSS?

#### --distractors--

When the margin of an element is set to a negative number and this causes issues in the layout.

---

When the margin of an element is decreased by the padding and this changes the element's dimensions.

---

When the margin of an element is ignored by the browser, so it's not visible.

#### --answer--

When the vertical margins of adjacent elements overlap, so they are combined into a single margin.

## --quiz--

### --question--

#### --text--

Which of the following is TRUE about the `translate()` function?

#### --distractors--

It is used to scale the size of an element.

---

It is used to translate the text of an element.

---

It is used to change the shape or size of an element.

#### --answer--

It is used to move an element from its current position.

### --question--

#### --text--

Which of the following is a component of the CSS box model?

#### --distractors--

Width

---

Height

---

Size

#### --answer--

Padding

### --question--

#### --text--

When an element's `box-sizing` is set to `content-box`, which part of the box model does the `width` and `height` apply to?

#### --distractors--

Content, padding, border, and margin

---

Content and padding

---

Content, padding, and border

#### --answer--

Content

### --question--

#### --text--

When an element's `box-sizing` is set to `border-box`, which parts of the CSS box model does the `width` and `height` NOT apply to?

#### --distractors--

The content area.

---

Padding

---

Border

#### --answer--

Margin

### --question--

#### --text--

Which value for the `brightness()` function makes an element completely black?

#### --distractors--

`100%`

---

`0px`

---

`100px`

#### --answer--

`0%`

### --question--

#### --text--

What kind of values does the `hue-rotate()` function use?

#### --distractors--

Pixels

---

Radians

---

Percentages

#### --answer--

Degrees

### --question--

#### --text--

What does the CSS property `filter: contrast(0%);` do to an element?

#### --distractors--

It will make the element appear completely white.

---

It will make the element appear completely black.

---

It will have no effect on the element.

#### --answer--

It will make the element appear completely grey.

### --question--

#### --text--

What is the baseline value of the `brightness()` CSS function from which increasing brightness starts?

#### --distractors--

`100px`

---

`50px`

---

`50%`

#### --answer--

`100%`

### --question--

#### --text--

What kind of values does the `grayscale()` function use?

#### --distractors--

Pixels

---

Degrees

---

Radians

#### --answer--

Percentages

### --question--

#### --text--

What kind of values does the `contrast()` function use?

#### --distractors--

Pixels

---

Degrees

---

Radians

#### --answer--

Percentages

### --question--

#### --text--

What does the `overflow-x` property in CSS control?

#### --distractors--

It determines the horizontal overflow on the y-axis.

---

It determines the vertical overflow on the y-axis.

---

It determines the vertical overflow on the x-axis.

#### --answer--

It determines the horizontal overflow on the x-axis.

### --question--

#### --text--

What does the `overflow-y` property in CSS control?

#### --distractors--

It determines the horizontal overflow on the x-axis.

---

It determines the vertical overflow on the x-axis.

---

It determines the horizontal overflow on the y-axis.

#### --answer--

It determines the vertical overflow on the y-axis.

### --question--

#### --text--

What is an example of a third party option for a CSS reset?

#### --distractors--

clean.css

---

restore.css

---

reset.css

#### --answer--

sanitize.css

### --question--

#### --text--

How many dimensions are there to the overflow property in CSS?

#### --distractors--

One

---

Three

---

Four

#### --answer--

Two

### --question--

#### --text--

If the shorthand property `overflow` is given two values, which property will use the first value?

#### --distractors--

`overflow-y`

---

`overflow-w`

---

`overflow-z`

#### --answer--

`overflow-x`

### --question--

#### --text--

What kind of blur effect does the `blur()` function apply to an element in CSS?

#### --distractors--

Giliani

---

Galilei

---

Galileo

#### --answer--

Gaussian

### --question--

#### --text--

What kind of values does the `sepia()` function use?

#### --distractors--

Pixels

---

Radians

---

Degrees

#### --answer--

Percentages

### --question--

#### --text--

If the shorthand property `overflow` is given two values, which property will use the second value?

#### --distractors--

`overflow-w`

---

`overflow-x`

---

`overflow-z`

#### --answer--

`overflow-y`

### --question--

#### --text--

What does a CSS reset do?

#### --distractors--

It forces browsers to use dark mode by default.

---

It removes inline styles from HTML elements.

---

It disables browser extensions that include CSS.

#### --answer--

It removes default browser styling.

### --question--

#### --text--

What does the CSS property `filter: grayscale(100%);` do to an element?

#### --distractors--

It will have no effect on the element.

---

It will make the element appear completely black.

---

It will make the element appear completely white.

#### --answer--

It removes color saturation while maintaining the element's tonal structure.

---

## css-flexbox

### What Is CSS Flexbox, and When Should You Use It?


---

### What Are Some Common Flex Properties, and How Do They Work?


---

### Step 1
Start this project by linking your `styles.css` file to the page.

---

### Step 2
Add a `header` element within the `body` element and assign a class of `header` to it.

Inside the `header`, create an `h1` with `css flexbox photo gallery` as the text.

---

### Step 3
Below your `.header` element, create a new `div` element and assign it a `class` of `gallery`. This `div` will act as a container for the gallery images.

Inside that `.gallery` element, create nine `img` elements.

---

### Step 4
Next, give each `img` a `src` attribute according to its order in the document. The first `img` should have a `src` of `https://cdn.freecodecamp.org/curriculum/css-photo-gallery/1.jpg`. The rest should be the same, except replace the `1` with the number the `img` is in the document.

---

### Step 9
Now your images are too big.

Create a `.gallery img` selector to target them. Give them all a `width` of `100%` and a `max-width` of `350px`.

Also set the `height` property to `300px` to keep your images a uniform size.

---

### Step 11
Align your `.header` text in the center. Make the text uppercase using the `text-transform` property with `uppercase` as the value.

Give it a padding of `32px` on all sides. Set the background to `#0a0a23` and the text to `#fff` as the color values.

Add a `border-bottom` with `4px solid #fdb347` as the value.

---

### Step 12
Flexbox is a one-dimensional CSS layout that can control the way items are spaced out and aligned within a container.

To use it, give an element a `display` property of `flex`. This will make the element a <em>flex container</em>. Any direct children of a flex container are called <em>flex items</em>.

Create a `.gallery` selector and make it a flex container.

---

### Step 13
Flexbox has a main and cross axis. The main axis is defined by the `flex-direction` property, which has four possible values:

- `row` (default): horizontal axis with flex items from left to right
- `row-reverse`: horizontal axis with flex items from right to left
- `column`: vertical axis with flex items from top to bottom
- `column-reverse`: vertical axis with flex items from bottom to top

**Note**: The axes and directions will be different depending on the text direction. The values shown are for a left-to-right text direction.

Try the different values to see how they affect the layout.

When you are done, set an explicit `flex-direction` of `row` on the `.gallery` element.

---

### Step 14
The `flex-wrap` property determines how your flex items behave when the flex container is too small. Setting it to `wrap` will allow the items to wrap to the next row or column. `nowrap` (default) will prevent your items from wrapping and shrink them if needed.

Make it so your flex items wrap to the next row when they run out of space.

---

### Step 15
The `justify-content` property determines how the items inside a flex container are positioned along the main axis, affecting their position and the space around them.

Give your `.gallery` selector a `justify-content` property with `center` as the value.

---

### Step 16
The `align-items` property positions the flex content along the cross axis. In this case, with your `flex-direction` set to `row`, your cross axis would be vertical.

To vertically center your images, give your `.gallery` selector an `align-items` property with `center` as the value.

---

### Step 17
Give your `.gallery` selector a `padding` property set to `20px 10px` to create some space around the container.

Then, give it a `max-width` of `1400px` and add a `margin` of `0 auto` to center it.

---

### Step 18
Notice how some of your images have become distorted. This is because the images have different aspect ratios. Rather than setting each aspect ratio individually, you can use the `object-fit` property to determine how images should behave.

Give your `.gallery img` selector the `object-fit` property and set it to `cover`. This will tell the image to fill the `img` container while maintaining aspect ratio, resulting in cropping to fit.

---

### Step 19
Your images need some space between them.

The `gap` CSS shorthand property sets the gaps, also known as gutters, between rows and columns. The `gap` property and its `row-gap` and `column-gap` sub-properties provide this functionality for flex, grid, and multi-column layout. You apply the property to the container element.

Give your `.gallery` flex container a `gap` property with `16px` as the value.

---

### Step 20
Smooth out your images a bit by giving the `.gallery img` selector a `border-radius` property with `10px` set as the value.

---

### Step 21
The `::after` pseudo-element creates an element that is the last child of the selected element. You can use it to add an empty element after the last image. If you give it the same `width` as the images it will push the last image to the left when the gallery is in a two-column layout. Right now, it is in the center because you set `justify-content: center` on the flex container.

Example:

```CSS
.container::after {
  content: "";
  width: 860px;
}
```

Create a new selector using an `::after` pseudo-element on the `.gallery` element. Add a `content` property set to an empty string `""` and `350px` set for the `width` property.

---

### Step 22
The `alt` image attribute should describe the image content. Screen readers announce the alternative text in place of images. If the image can't be loaded, this text is presented in place of the image.

To complete the project, add an `alt` attribute to all nine of your cat images to describe them. Use a value at least five characters long for each.

---

### Step 10
Remove the margin from your body element, set the `font-family` to `sans-serif`, and give it a `background-color` of `#f5f6f7` as the value.

---

### Step 7
The `border-box` sizing model does the opposite of `content-box`. The total width of the element, including padding and border, will be the explicit width set. The content of the element will shrink to make room for the padding and border.

Change the `box-sizing` property to `border-box`. Notice how your blue image borders now fit within your red gallery border.

---

### Step 6
Notice how the blue image border extends beyond the red gallery border. This is due to the way browsers calculate the size of container elements.

The `box-sizing` property is used to set this behavior. By default, the `content-box` model is used. With this model, when an element has a specific width, that width is calculated based only on the element's content. Padding and border values get added to the total width, so the element grows to accommodate these values.

Try setting `box-sizing` to `content-box` explicitly, with the global `*` selector. At this point, you will not see any changes, because you are using the default value.

---

### Step 5
In order to better visualize how your elements are sized, adding a border can be helpful.

Give your `.gallery` element a `width` of `50%` and a `border` set to `5px solid red`.

Then give your `img` elements a `width` of `100%`, `padding` set to `5px`, and a `border` set to `5px solid blue`.

---

### Step 8
Now that you have figured out your `box-sizing` approach, you can clean up the CSS you added to see the changes.

Remove your `.gallery` and `img` selectors, and all rules within.

---

### Step 1
In this workshop you will practice working with CSS flexbox by designing a set of colored boxes.

To begin, inside the `body` element, add a `header` element. Nest an `h1` element inside the `header` element with the text `Colored Boxes Layout`.

---

### Step 4
Now add a `div` element with the class `flex-container` below your `header`. Then create six `div` elements with the class `box` inside the `div` you just created.

Remember that a class attribute is often used to point to a class name in a style sheet. In this case, all of the `div` elements will be styled equally according to the `.flex-container` and `.box` style definition.

---

### Step 23
Now you are going to use the `align-content` property. This property controls the arrangement of items along the cross axis. While the default value of `align-content` is `stretch`, the most relevant options you can use for `align-content` are: `space-between`, `start`, `center`, `end`, `space-around` and `space-evenly`.

Add the property `align-content` with the value `space-between` to see how the boxes will align in the `.flex-container` element.

---

### Step 24
Now try another alignment value. Change the `align-content` value from `space-between` to `start`.

With the `start` value, items are packed toward the start edge of the alignment container.

---

### Step 25
Next on the list is the `center` value. Change `align-content` value from `start` to `center`.

With the `center` value, items will be packed to the center of the alignment container.

---

### Step 26
Now to see how the `end` value works, change the `align-content` value from `center` to `end`.

With the `end` value, items will be packed to the end of the alignment container.

---

### Step 27
With the `space-around` value, items are evenly distributed within the alignment container. Each item has equal space on both sides, but the space at the start and end edges is half the space between two adjacent items. To see it in action, change the `align-content` value from `end` to `space-around`.

---

### Step 28
Now you are going to check on the last alignment value. Change the `align-content` value from `space-around` to `space-evenly`.

With the `space-evenly` value, items are evenly distributed within the alignment container. The space between all items is exactly the same, including the space at the start and the end.

---

### Step 29
The `flex` property controls the size and behavior of the items inside a flexible container. It is composed by three properties: `flex-grow`, `flex-shrink`, and `flex-basis`.

The `flex-grow` property controls how much extra space the flex item should take up if there is free space available in the container.

Now, getting back to the `.box` selector, change the first number in `flex` (corresponding to the `flex-grow` value) from `1` to `0`.

---

### Step 30
The second value of the `flex` property sets the `flex-shrink` property. This property controls how much the flex item will shrink when there isn't enough space in the container for all items.

Still inside the `.box` selector, change the second value in `flex` from `1` to `0`.

---

### Step 31
The last value of the `flex` property sets the `flex-basis` property. This property sets the starting size of a flex item before it grows or shrinks.

Finally, change the last value in `flex` from `100px` to `150px` inside your `.box` selector.

---

### Step 32
Going back to the `html` file, add the class `box1` to the first `div` with the class of `box`.

---

### Step 34
Going back to the `html` file, add the class `box2` to the second `.box` element.

---

### Step 36
In your `html` file, add the class `box3` to the third `.box` element.

---

### Step 38
Inside the `html` file, add the class `box4` to your fourth `.box` element.

---

### Step 40
Add the class `box5` to your fifth `.box` element.

---

### Step 42
Finally add the class `box6` to the last of your `.box` elements.

---

### Step 33
Now you are going to organize the boxes inside your flexbox container. First, create a `.box1` selector and add to it the `background` property with the value `#f16e79`.

Then, add the property `order` with the value `1`. You'll see the first box move to the end. This happens because the `box` class already has an `order` value of `0`, and items with higher order values appear later.

Also add the `flex-grow` property with a value of `1`. This will make the box grow to fill extra space on its line.

---

### Step 35
Inside your `styles.css` file, create a `.box2` selector and add the `background` property with the value `#f4a261` to it.

Also, add the `order` property with a value of `0`.

---

### Step 37
Now to continue styling your boxes, create a new `.box3` selector and add the `background` property with the value `#ffd166` to it.

Then, add the `order` property with a value of `2` to your new selector. You'll see this box move after the `.box1` element.

Also add the `flex-shrink` property with a value of `3`. This means that this box will shrink three times as much as the other boxes when there isn't enough space on its line.

---

### Step 39
Now create a `.box4` selector and add the `background` property with the value `#4caf50` to it.

Then add the `order` property with a value of `3` to the `.box4` selector. You'll see this box move after the one with the `box3` class.

---

### Step 41
Now create a `.box5` selector and add the `background` property with the value `#457b9d` to it.

Then add the `order` property with a value of `4` to your new selector. You'll see this box move after the one with the `box4` class.

---

### Step 43
Create a `.box6` selector and add the `background` property with the value `#3f51b5` to it.

Then add the `order` property with a value of `5` to your new selector. You'll see the `.box6` element move after the `.box5` element.

Also, add the `flex-grow` property with a value of `1`. This will make box 6 grow to fill any remaining space in the container.

With that, the colorful boxes workshop is complete!

---

### Step 3
Now it is time to add some CSS rules to the `styles.css` file. Start by creating a selector for the `h1` element. 

Center the content of the `h1` element by setting its `text-align` property to `center`. Also create a `margin-bottom` property with the value `10px` to add margin between the bottom of the `h1` element and any HTML element that goes bellow.

---

### Step 19
Create a `.flex-container` selector and set the `display` property to the value `flex`.

---

### Step 20
The `flex-wrap` property defines whether flex items are forced onto one line or can wrap onto multiple lines.

By default, flex items have a value of `nowrap`, meaning they stay on a single line even if they overflow the container. The `wrap` value instead makes flex items wrap onto new lines when they don't fit in the container's width, creating a more flexible, responsive layout.

To continue, add the `flex-wrap` property with the value `wrap` to the `.flex-container` class selector.

---

### Step 21
Now you will set the width and height of the `.flex-container` element. To do this, add the `width` property with the value `70%` and the `height` property with the value `600px`.

Defining `width` and `height` properties will set the amount of width and height the `div` takes form its parent element, in this case the `body` element.

---

### Step 22
To finish styling the `flex-container` class, add the `padding` property with a value of `10px` and the `margin` property with a value of `20px auto`.

Remember: `padding` adds space inside the element (between the border and content), while `margin` adds space outside the element (between the border and other elements).

---

### Step 6
Now it's time to create the color name for the boxes. To do this, add a `p` element below each `h2` element with these color names in order: `Red`, `Orange`, `Yellow`, `Green`, `Blue`, and `Indigo`. One color for each box.

---

### Step 5
Inside each `.box` element, add an `h2` element with the text `Box` followed by a space and a sequential number starting from `1`.

---

### Step 7
Now you are going to style the `div` elements with the class `box`. First create a `.box` class selector and add the property `max-height` with the value `120px` to the `box` class selector.

---

### Step 8
Still inside the `.box` selector, add the property `color` with the value `#000`. This is going to make all text of `.box` elements to have the `#000` color.

---

### Step 9
Add the property `border` with the value `1px solid #000` to the `.box` selector. The `border` property is used to create a visible outline around an element. It can be customized in terms of `border-width`, `border-style`, and `border-color`. 

In this case ,`1px` is `border-width`, which defines the thickness of the border. `solid` is `border-style` and sets the appearance of the border (solid, dashed, dotted and so on). And `#000` is `border-color`, which defines the color of the border.

---

### Step 10
The `display` property controls how an element is rendered on the page. When you define it with the `flex` value, this enables flexbox layout mode, which gives you control to arrange and align the items inside the container.

Now add the property `display` with the value `flex` to the `.box` selector.

---

### Step 12
The `flex-direction` property controls how flex items are arranged within their container. The default value is `row`, which arranges items horizontally from left to right. This property only works on elements with `display: flex` or `display: inline-flex`.

With the `column` value, items stack vertically from top to bottom. Other possible values are `row`, `row-reverse` and `column-reverse`.

Now add the `flex-direction` property with the value `column` to the `.box` selector.

---

### Step 13
The `align-items` property aligns flex items along the cross axis (perpendicular to the main axis).

Now add the `align-items` property with the value `center` to the `.box` selector. Since the `box` class has `flex-direction: column`, the cross axis is horizontal, so `center` will center items horizontally within the box.

---

### Step 14
Now add the property `margin` with the value `10px` to the `.box` selector.

---

### Step 15
The `font-weight` property controls font thickness.

Now add the `font-weight` property with a value `bold` to the `.box` selector.

---

### Step 16
Add the property `font-size` with the value `1.125rem` to the `.box` selector.

The `font-size` property specifies the size of the text. It can be set using different units like pixels, em, rem, percentages, and so on, making it flexible for responsive designs.

In this case, the value uses `rem` units, which are relative to the root `html` element, not the parent element. This means the font size stays consistent and isn't affected by parent element sizes, making it more predictable for layouts.

---

### Step 17
The `border-radius` property rounds the corners of an element's border. You can specify:

- One value to apply to all four corners.
- Two values, with the first value for top-left/bottom-right, and second for top-right/bottom-left.
- Three values, corresponding to top-left, top-right/bottom-left, bottom-right.
- Four values, which set the border radius clockwise starting from top-left corner.

Now add the property `border-radius` with the value `5px` to the `.box` selector.

---

### Step 18
The `order` property specifies the order of a flex item relative to other flex items inside the same container. By default, all flex items have an `order` value of `0`, meaning they appear in the order they're written in the HTML. Items with lower `order` values appear first, while items with higher values appear last.

Add the property `order` with the value `0` to the `.box` selector.

---

### Step 2
Now link your `styles.css` file to the HTML document.

---

### Step 11
The `flex` property controls the size and behavior of the items inside a flexible container. It is composed by three properties: `flex-grow`, `flex-shrink`, and `flex-basis`.

Now add the `flex` property with the value `1 1 100px` to the `.box` selector. This will make each box start at `100px`, allowing them to grow to fill available space, or shrink when needed.

---

### Design a Pricing Plans Layout Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. Your page should have an `h1` element with the text `Pricing Plans`.
2. Your page should have a `div` element with the class `pricing-container` below the `h1` element.
    - The `.pricing-container` selector should have a `display` property with the value of `flex` and a `flex-wrap` property with the value of `wrap`.
3. Within the `.pricing-container` element, you should have three `div` elements with the class `pricing-card` to represent the pricing plans.
    - One of the `.pricing-card` elements should have the class `basic-plan` in addition to the `pricing-card` class.
    - One of the `.pricing-card` elements should have the class `pro-plan` in addition to the `pricing-card` class.
    - One of the `.pricing-card` elements should have the class `premium-plan` in addition to the `pricing-card` class.
4. Your `.basic-plan` element should have an `h2` element with the text `Basic`.
5. Your `.basic-plan` element should have a `p` element with the text `$9/month`.
6. Your `.pro-plan` element should have an `h2` element with the text `Pro`.
7. Your `.pro-plan` element should have a `p` element with the text `$19/month`.
8. Your `.premium-plan` element should have an `h2` element with the text `Premium`.
9. Your `.premium-plan` element should have a `p` element with the text `$29/month`.
10. Each of your `.pricing-card` elements should:
    - Use Flexbox to stack its content in a column and justify the space between the children using `space-between`.
    - Set the `flex` property to `0 0 200px` to give it a consistent width and prevent it from growing or shrinking in the layout.
    - Set the `border` property to `2px solid black` to see how the different cards take up space.
11. The `.basic-plan` element should appear first in the layout. You should use the `order` property for this.
12. The `.pro-plan` element should appear second in the layout. You should use the `order` property and set its `flex-grow` property to `2` so it takes up more space than the other plans.
13. The `.premium-plan` element should come last in the layout. You should use the `order` property for this.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### CSS Flexbox Review


---

### CSS Flexbox Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What is flexbox?

#### --distractors--

A two-dimensional model for layout.

---

A three-dimensional model for layout.

---

A multi-dimensional model for layout.

#### --answer--

A one-dimensional model for layout.

### --question--

#### --text--

What CSS property is set to enable the flexbox layout for the `div` element?

#### --distractors--

```css
div {
  flex: 1;
}
```

---

```css
div {
  flex-direction: row;
}
```

---

```css
div {
  flex-wrap: wrap;
}
```

#### --answer--

```css
div {
  display: flex;
}
```

### --question--

#### --text--

Which CSS property lets flex items wrap onto a new row when the current row is full?

#### --distractors--

`flex-direction`

---

`justify-content`

---

`align-items`

#### --answer--

`flex-wrap`

### --question--

#### --text--

What does the flexbox property `justify-content` control?

#### --distractors--

It controls the direction of the child elements of the flexbox container.

---

It controls the text style of the child elements of the flexbox container.

---

It controls the alignment of the child elements within the flexbox container.

#### --answer--

It controls the distribution of the child elements on the main axis.

### --question--

#### --text--

What property controls the direction of the elements within the flexbox container?

#### --distractors--

`flex-wrap`

---

`flex`

---

`justify-content`

#### --answer--

`flex-direction`

### --question--

#### --text--

Which CSS properties can be used to make flex items flow from left to right, and have the new flex item appear on top of the previous one if the width of the current row is exceeded?

#### --distractors--

```css
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
}
```

---

```css
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
```

---

```css
.container {
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
}
```

#### --answer--

```css
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}
```

### --question--

#### --text--

What property controls the positioning of the elements on the cross axis?

#### --distractors--

`flex-wrap`

---

`flex-direction`

---

`justify-content`

#### --answer--

`align-items`

### --question--

#### --text--

Which is not a value for `justify-content`?

#### --distractors--

`flex-start`

---

`center`

---

`space-between`

#### --answer--

`row`

### --question--

#### --text--

What CSS properties would you use to center an element within a flex container horizontally, and vertically?

#### --distractors--

```css
.container {
  display: flex;
  justify-content: center;
}
```

---

```css
.container {
  display: flex;
  align-items: center;
}
```

---

```css
.container {
  display: flex;
  align-content: center;
}
```

#### --answer--

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### --question--

#### --text--

What value of `flex-direction` makes the flex items go from right to left?  

#### --distractors--

`column-reverse`

---

`column`

---

`row`

#### --answer--

`row-reverse`

### --question--

#### --text--

What is not a value of the `flex-wrap` property?

#### --distractors--

`nowrap`

---

`wrap`

---

`wrap-reverse`

#### --answer--

`row`

### --question--

#### --text--

What does the `stretch` value in `align-items` do?

#### --distractors--

Items are packed directly against each other toward the start edge of the container.

---

Items are aligned such that their flex container baselines align.

---

Items are packed directly against each other toward the end edge of the container.

#### --answer--

Auto-size items to be equally large to fill the container.

### --question--

#### --text--

Which `justify-content` value places the first item at the start, the last item at the end, and evenly spaces the other items between them along the main axis?

#### --distractors--

`space-evenly`

---

`space-around`

---

`center`

#### --answer--

`space-between`

### --question--

#### --text--

Which `justify-content` value spaces items so that the gaps between every pair of adjacent items and the container’s edges are all equal?

#### --distractors--

`space-between`

---

`space-around`

---

`center`

#### --answer--

`space-evenly`

### --question--

#### --text--

Which `justify-content` value spaces items equally along the main axis while leaving half that amount of space at the container’s edges?

#### --distractors--

`space-evenly`

---

`center`

---

`space-between`

#### --answer--

`space-around`

### --question--

#### --text--

Which of the following results in the items being aligned at the start of the cross axis?

#### --distractors--

`align-items: flex-starts;`

---

`align-items: baseline;`

---

`align-items: first-baseline;`

#### --answer--

`align-items: flex-start;`

### --question--

#### --text--

Which of the following results in the items being aligned at the end of the cross axis?

#### --distractors--

`align-items: flex-ends;`

---

`align-items: end;`

---

`align-items: flex-ending;`

#### --answer--

`align-items: flex-end;`

### --question--

#### --text--

Which value for `flex-direction` will make it so items are aligned along the main axis from left to right?

#### --distractors--

`column`

---

`column-reverse`

---

`row-reverse`

#### --answer--

`row`

### --question--

#### --text--

Which value for `flex-direction` will make it so items are aligned along the cross axis from top to bottom?

#### --distractors--

`row`

---

`column-reverse`

---

`row-reverse`

#### --answer--

`column`

### --question--

#### --text--

Which of the following use case is not suitable for flexbox?

#### --distractors--

Centering an item in a container.

---

Vertical alignment of items in a row.

---

Dynamically adjusting distribution and alignment of items for different viewports.

#### --answer--

Fixed sizing and space between items like a grid.

## --quiz--

### --question--

#### --text--

What is the purpose of a one-dimensional layout model like Flexbox?

#### --distractors--

To handle layout in two dimensions, both rows and columns at the same time.

---

To control the stacking order of positioned elements using `z-index`.

---

To create 3D transforms and complex animations on page elements.

#### --answer--

To lay out items along a single line or axis, either as a row or as a column.

### --question--

#### --text--

Which CSS property will align all the flex items to the right side of the `.container` element?

```css
.container {
  display: flex;
  flex-direction: row;
}
```

#### --distractors--

`justify-content: flex-start;`

---

`justify-content: space-between;`

---

`align-items: flex-end;`

#### --answer--

`justify-content: flex-end;`

### --question--

#### --text--

What are the two axes that define the direction of item layout in the Flex Model?

#### --distractors--

The horizontal axis and the vertical axis.

---

The x-axis and the y-axis.

---

The primary axis and the secondary axis.

#### --answer--

The main axis and the cross axis.

### --question--

#### --text--

Which of the following CSS rules will arrange items in a vertical column and also center them horizontally within their container?

#### --distractors--

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

---

```css
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

---

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
```

#### --answer--

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

### --question--

#### --text--

What is the main purpose of the `flex-wrap` property?

#### --distractors--

It sets the direction that flex items are placed in the flex container.

---

It aligns flex items along the main axis of the container.

---

It aligns flex items along the cross axis of the container.

#### --answer--

It determines if flex items should wrap onto new lines to fit available space.

### --question--

#### --text--

What is the default behavior of the `flex-wrap: nowrap;` declaration?

#### --distractors--

It forces flex items to wrap onto a new line if they are too wide for the container.

---

It wraps items onto a new line, but in the reverse order.

---

It prevents the flex container from being larger than its parent element.

#### --answer--

It forces flex items to remain on a single line, even if they overflow the container.

### --question--

#### --text--

Which CSS property is a shorthand for setting both the `flex-direction` and `flex-wrap` properties at once?

#### --distractors--

`flex-box`

---

`flex-align`

---

`flex-container`

#### --answer--

`flex-flow`

### --question--

#### --text--

What is the effect of setting `flex-direction: column-reverse;` on a flex container?

#### --distractors--

It arranges items horizontally from right to left.

---

It reverses the items in a row, but keeps them on a single line.

---

It arranges items vertically from top to bottom.

#### --answer--

It arranges items vertically in a reverse order from bottom to top.

### --question--

#### --text--

Which CSS snippet correctly arranges flex items in a vertical column and allows them to wrap onto a new column if they overflow the container's height?

#### --distractors--

```css
.container {
  display: flex;
  flex-flow: row wrap;
}
```

---

```css
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
```

---

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### --answer--

```css
.container {
  display: flex;
  flex-flow: column wrap;
}
```

### --question--

#### --text--

Which `justify-content` value aligns all flex items to the end of the container's main axis?

#### --distractors--

`justify-content: end;`

---

`justify-content: center;`

---

`justify-content: flex-start;`

#### --answer--

`justify-content: flex-end;`

### --question--

#### --text--

What is the effect of the following CSS rule on flex items?

```css
.container {
  flex-flow: row nowrap;
}
```

#### --distractors--

Items are arranged in a column and will wrap to a new column.

---

Items are arranged in a row and will wrap to a new row.

---

Items are arranged in a column and will overflow if they don't fit.

#### --answer--

Items are arranged in a row and will overflow the container if they don't fit.

### --question--

#### --text--

How does `justify-content: space-evenly;` align flex items?

```css
.container {
  display: flex;
  justify-content: space-evenly;
}
```

#### --distractors--

Items are evenly spaced, with no space at the start or end.

---

Items are packed together in the center of the container.

---

Items are pushed to the right side of the container, with equal spacing between them.

#### --answer--

Items have equal space between them and at both ends of the container.

### --question--

#### --text--

Which property would you use to vertically center items when `flex-direction: row;` is set?

#### --distractors--

`justify-content: center;`

---

`vertical-align: middle;`

---

`text-align: center;`

#### --answer--

`align-items: center;`

### --question--

#### --text--

What does the `flex-start` value for the `justify-content` property do?

#### --distractors--

It aligns items to the start of the cross axis.

---

It stretches items to fill the container's main axis.

---

It centers all the items along the main axis.

#### --answer--

It aligns items to the beginning of the container's main axis.

### --question--

#### --text--

How would you set up a flex container to arrange its items from right-to-left on a single line, and also position them at the top of the container?

#### --distractors--

```css
.container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
```

---

```css
.container {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
}
```

---

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: flex-start;
}
```

#### --answer--

```css
.container {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
}
```

### --question--

#### --text--

Which of the following is a valid declaration for the `flex-flow` property?

#### --distractors--

`flex-flow: center wrap;`

---

`flex-flow: row space-between;`

---

`flex-flow: column reverse;`

#### --answer--

`flex-flow: column wrap-reverse;`

### --question--

#### --text--

Which of the following CSS rules will result in flex items being centered horizontally and stretched vertically to fill the height of the container?

#### --distractors--

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

```css
.container {
  display: flex;
  justify-content: stretch;
  align-items: center;
}
```

---

```css
.container {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}
```

#### --answer--

```css
.container {
  display: flex;
  justify-content: center;
  align-items: stretch;
}
```

### --question--

#### --text--

What effect does `align-items: stretch;` have when `flex-direction` is set to `column`?

#### --distractors--

It stretches items vertically to fill the container's height.

---

It has no effect when the direction is `column`.

---

It stretches items vertically to match the tallest item.

#### --answer--

It stretches items horizontally to fill the container's width.

### --question--

#### --text--

If you want to reverse the order of items in a horizontal row, which declaration should you use?

#### --distractors--

`flex-direction: column-reverse;`

---

`flex-wrap: wrap-reverse;`

---

`flex-direction: reverse-row;`

#### --answer--

`flex-direction: row-reverse;`

### --question--

#### --text--

Which value of `align-items` will position items at the top of a container whose `flex-direction` is `row`?

#### --distractors--

`align-items: top;`

---

`justify-content: flex-start;`

---

`align-items: stretch;`

#### --answer--

`align-items: flex-start;`

---

## lab-page-of-playing-cards

### Build a Page of Playing Cards
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should build a webpage that displays at least three playing cards.
1. You should have a `main` element with an ID of `playing-cards`.
1. Within your `#playing-cards` element, you should have at least three `div` elements, each with a class of `card`.
1. Within each `.card` element, you should have three `div` elements, the first with a class of `left`, the second with a class of `middle`, and the third with a class of `right`.
1. Your `#playing-cards` element should use flexbox to horizontally center its children, allow them to wrap, and put a `20px` space between them.
1. Each of your `.card` elements should use flexbox to justify its children using `space-between`.
1. Each of your `.left` elements should use flexbox item properties to align itself at the start of its' parent container.
1. Each of your `.middle` elements should use flexbox item properties to align itself in the center of its' parent container.
1. Each of your `.right` elements should use flexbox item properties to align itself at the end of its parent container.
1. Each of your `.middle` elements should use flexbox to display its children in a column.

Here are some characters you can copy and paste to use in your cards if you want: `♠`, `♣`, `♥`, and `♦`.

---

## css-typography

### What Are the Fundamentals of Typography?
Typography is the art of choosing the right fonts and format to make text visually appealing and easy to read. "Type" refers to how the individual characters are designed and arranged. By choosing the right fonts for your project, you can evoke emotions, establish hierarchy, and reinforce your brand's identity.

We'll start by talking about typefaces and fonts. A typeface is the overall design and style of a set of characters, numbers, and symbols. It's like a blueprint for a family of fonts. A font is a specific variation of a typeface with specific characteristics, such as size, weight, style, and width.

Two very important examples of typefaces are Serif and Sans Serif. The Serif typeface has a classical style with small lines at the end of characters. Serif typefaces are commonly used for printed materials, like books.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-1.png" alt="The text 'Hello, World!' displayed in a serif font, showing the small decorative lines at the ends of characters" />

Some examples are Times New Roman, Georgia, and Garamond.

In contrast, the Sans Serif typeface has a more modern look, without the small lines at the end of characters. Sans Serif typefaces are commonly used in digital design because they are easy to read on screen. Some examples include Helvetica, Arial, and Roboto.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-2.png" alt="The text 'Hello, World!' displayed in a sans-serif font, showing characters without decorative lines at the ends" />

There are other typeface classifications, like Script, Blackletter, Monospaced, and Decorative.

We mentioned that typefaces are like blueprints for fonts, right? Well, fonts can also be grouped if they share a similar design. Different weights and styles can be combined. For example, Times New Roman includes variations like Times New Roman Bold, Times New Roman Italic, and Times New Roman Bold Italic. These variations within the same font family typically include:

- Weight: The thickness of the characters, including light, regular, bold, and black.
- Style: The slant and orientation of the characters, like italic and oblique.
- Width: The horizontal space occupied by characters, like condensed and expanded.

Great. Now let's explore the fundamental elements of typography:

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-3.png" alt="The word 'happy' in bold with a red horizontal line labeled 'Baseline' showing the imaginary line on which the characters rest" />

The baseline is the imaginary line on which most characters rest.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-4.png" alt="The word 'Happy' with two red horizontal lines and a double-headed arrow labeled 'Cap Height' measuring the distance from the baseline to the top of uppercase letters" />

The cap height is the height of uppercase letters, measured from the baseline to the top.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-5.png" alt="The word 'happy' with two red horizontal lines and a double-headed arrow labeled 'X-Height' measuring the height of lowercase letters excluding ascenders and descenders" />

The x-height is the average height of lowercase letters, excluding ascenders and descenders.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-6.png" alt="The word 'happy' with a red line labeled 'Ascenders' marking the area above the x-height where the top of the letter 'h' extends" />

Ascenders are the parts of lowercase letters that extend above the x-height, such as the tops of the letters `h`, `b`, `d`, and `f`.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-7.png" alt="The word 'happy' with two red lines labeled 'Descenders' marking the area below the baseline where the tails of 'p' and 'y' extend" />

Descenders are the parts of lowercase letters that extend below the baseline, such as the tails of `y`, `g`, `p`, and `q`.

There are more advanced concepts too, like kerning, tracking, and leading.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-8.png" alt="The word 'Available' with a yellow triangle highlighting the space between the letters 'A' and 'v', illustrating the gap that kerning can adjust" />

Kerning is how space is adjusted between specific pairs of characters to improve their readability and aesthetics. For example, reducing the space between the letters `A` and `V`.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-9.png" alt="The word 'Available' with normal character spacing, showing the default distance between letters" />

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-10.png" alt="The word 'Available' with increased spacing between all characters, illustrating how tracking affects the overall density of text" />

Tracking is how space is adjusted between all characters in a block of text. It's essentially the distance between the characters. It affects how dense and open the text will be.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-the-fundamentals-of-typography-11.png" alt="The text 'Let's learn typography' split across two lines with a red double-headed arrow labeled 'Leading' measuring the vertical space between the two baselines" />

Leading is the vertical space between lines of text. It's measured from the baseline of one line to the baseline of the next line.

Being familiar with these concepts is essential for choosing the right font for your project. 

Line length can also have a significant impact on readability. If the text is too narrow, readers will need to refocus too often. If the text is too wide, they may experience fatigue. You should find the optimal line length for comfortable reading.

With typography, you can also create a visual hierarchy, helping readers understand what parts of the text or user interface are most important. Larger fonts usually indicate that text is more important. Making the text bold is also helpful for emphasizing it.

Underlining text or presenting it in italics is helpful for highlighting key points. Providing accurate spacing around the text can highlight its importance. And color contrast can bring readers' attention to specific parts of the text.

Having basic knowledge of typography is essential for designing visually engaging applications. By understanding fonts, spacing, and hierarchy, you can create visual experiences that enhance the readability of your content and reinforce your brand's identity

# --questions--

## --text--

Which of the following refers to how the individual characters are designed and arranged?

## --answers--

Glyph

### --feedback--

Review the beginning of the lesson for the answer.

---

Type

---

Beak

### --feedback--

Review the beginning of the lesson for the answer.

---

Shoulder

### --feedback--

Review the beginning of the lesson for the answer.

## --video-solution--

2

## --text--

What is the difference between a typeface and a font?

## --answers--

A typeface is a specific style of a font, while a font is the overall design.

### --feedback--

Think about the relationship between a car model and a specific car.

---

A font is a specific style of a typeface, while a typeface is the overall design.

---

There is no difference between a typeface and a font.

### --feedback--

Think about the relationship between a car model and a specific car.

---

A typeface is a collection of fonts, while a font is a single character.

### --feedback--

Think about the relationship between a car model and a specific car.

## --video-solution--

2

## --text--

What is the main difference between serif and sans-serif fonts?

## --answers--

Serif fonts are handwritten, while sans-serif fonts are printed.

### --feedback--

Focus on the visual characteristics of the fonts.

---

Serif fonts have small lines at the end of characters, while sans-serif fonts do not.

---

Serif fonts are used for headlines, while sans-serif fonts are used for body text.

### --feedback--

Focus on the visual characteristics of the fonts.

---

Serif fonts are older than sans-serif fonts.

### --feedback--

Focus on the visual characteristics of the fonts.

## --video-solution--

2

---

### What Are Some Best Practices for Working with Typography in Your Designs?
Typography is the art and technique of arranging type to communicate effectively. It involves formatting text and selecting appropriate fonts. In this lesson, you will learn best practices for using typography in a way that enhances readability, hierarchy, and accessibility. 

Let's start with readability. You should choose clear and simple fonts to make your designs easy to understand. This is particularly important for the main text of your website. Users are more likely to engage with your content if the font is easy to read. Some frequently used fonts for web development are Roboto, Open Sans, Poppins, Lato, and Barlow. But there are many to choose from and you will definitely find one that fits your needs.

Text should also be large enough for everyone to read it. You should try to keep lines relatively short. The specific number of characters per line really depends on your project. But keeping lines short will make the content easier to read.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-some-best-practices-for-working-with-typography-in-your-designs-1.png" alt="Three levels of text hierarchy: 'Heading' in large bold serif, 'Subheading' in medium bold serif, and 'Text' in small regular weight" />

You can use font size to create a visual hierarchy for headings, subheadings, paragraphs, and other elements.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-some-best-practices-for-working-with-typography-in-your-designs-2.png" alt="freeCodeCamp's landing page showing 'Learn to code — for free.', 'Build projects.', and 'Earn certifications.' in progressively smaller text, with a 'Get started (it's free)' button below" />

For example, the main heading on a webpage should have a larger font, followed by subheadings with smaller font sizes. This will give every element in the hierarchy a specific font size that helps users navigate through the structure visually.

You should use two or three fonts at most to create a visual consistency. Using too many fonts can make the text more difficult to read and weaken your branding's identity. This can also impact the user experience by increasing the load time of the website.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-some-best-practices-for-working-with-typography-in-your-designs-3.png" alt="freeCodeCamp's Style Guide Typography section on a dark background, listing Hack-ZeroSlash as the primary monospace font, Lato as the primary proportional font, and SaxMono as the logo font" />

Once you choose these two or three fonts, use them consistently across different pages and elements. These fonts should be consistent with the overall design of your web application, product, or service.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-some-best-practices-for-working-with-typography-in-your-designs-4.png" alt="Two versions of the same text side by side: the top version has a green checkmark and good whitespace between lines, while the bottom version has a red X and cramped, poorly spaced text" />

You should also use whitespace to create a visual balance and enhance readability.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-some-best-practices-for-working-with-typography-in-your-designs-5.png" alt="WCAG 2.1 Understanding Docs page showing Understanding SC 1.4.3: Contrast (Minimum) (Level AA), with explanations of contrast ratio requirements for large and small text" />

For accessibility purposes, you should follow the Web Content Accessibility Guidelines. These guidelines set the recommended contrast ratio for text. A higher contrast ratio makes text easier to read, especially for people with visual disabilities.

You should also provide options to adjust font size and avoid complex fonts as much as possible. As a general rule, you should use simple fonts whenever possible. If your content is easy to read, users are more likely to engage with it.

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-some-best-practices-for-working-with-typography-in-your-designs-6.png" alt="Browser DevTools open alongside freeCodeCamp's landing page in responsive mode, showing CSS styles applied to the page's heading elements" />

A final tip for working with typography is making sure that your fonts are displayed correctly on different screen sizes and devices.

Typography is a powerful tool for creating beautiful designs and engaging user experiences. By understanding the fundamentals of typography and applying these best practices, you can create effective designs.

# --questions--

## --text--

Which of the following is a very important factor for ensuring readability in web typography?

## --answers--

Using a large variety of fonts.

### --feedback--

Think about how users perceive text on a screen and what they may find helpful.

---

Maximizing font size for all text elements.

### --feedback--

Think about how users perceive text on a screen and what they may find helpful.

---

Achieving optimal contrast between text and background.

---

Aligning text to the left margin.

### --feedback--

Think about how users perceive text on a screen and what they may find helpful.

## --video-solution--

3

## --text--

When choosing fonts for a website, it's generally recommended to:

## --answers--

Use as many different fonts as possible for visual interest.

### --feedback--

Think about how font choices impact the overall look and feel of a website.

---

Limit the number of font families to improve consistency.

---

Prioritize decorative fonts over readability.

### --feedback--

Think about how font choices impact the overall look and feel of a website.

---

Use only serif fonts for body text.

### --feedback--

Think about how font choices impact the overall look and feel of a website.

## --video-solution--

2

## --text--

Which of the following best describes the concept of visual hierarchy in typography?

## --answers--

Using only one font style throughout a design.

### --feedback--

Think about how typography can guide users' attention.

---

Prioritizing the most important information through font size and style.

---

Maintaining consistent spacing between letters.

### --feedback--

Think about how typography can guide users' attention.

---

Ensuring all text is centered on the page.

### --feedback--

Think about how typography can guide users' attention.

## --video-solution--

2

---

### What Are Font Families and How Do They Work?


---

### What Are Web Safe Fonts?
Web-safe fonts are a subset of fonts that are very likely to be installed on a computer or device. They are widely supported across different operating systems and web browsers, so it's very likely that they will be rendered and displayed consistently. Let's see how this works.

Browsers are responsible for interpreting and displaying fonts on a website. When the browser has to render a font, it tries to find the font file on the user's system. But if the font is not found, it will usually fall back to a default system font. This ensures that the content is still readable, even if the specific font that should be rendered on the website is missing.

However, the fallback font selected by the browser may look very different from the font that was originally supposed to be rendered. This can have a critical impact on the overall design and user experience. To avoid this, you should use web-safe fonts whenever possible. You have two options. You can either use them as your primary fonts or you can use custom fonts with a web-safe font as a fallback option. This way, you can control how the website will look in case the custom font is not found.

Let's check out some examples of web-safe fonts. In a previous lesson, you learned that sans-serif fonts are commonly used for web development because they don't have small "feet" or lines at the end of the characters, so they're easy to read on screen. Some examples of web-safe sans-serif fonts are:

Arial

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-web-safe-fonts-1.png" alt="The text 'Hello, World!' displayed in Arial, a clean geometric sans-serif font with uniform stroke width" />

Verdana

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-web-safe-fonts-2.png" alt="The text 'Hello, World!' displayed in Verdana, a wide sans-serif font with large open letterforms and a tall x-height" />

Trebuchet MS

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-web-safe-fonts-3.png" alt="The text 'Hello, World!' displayed in Trebuchet MS, a humanist sans-serif font with slightly rounded letterforms" />

In contrast, serif fonts do have small "feet" at the end of the characters, so they're commonly used for traditional print. But if you ever need to use them for web development purposes, web-safe serif fonts include:

Times New Roman

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-web-safe-fonts-4.png" alt="The text 'Hello, World!' displayed in Times New Roman, a classic serif font with strong contrast between thick and thin strokes" />

Georgia

<img src="https://cdn.freecodecamp.org/curriculum/lecture-transcripts/what-are-web-safe-fonts-5.png" alt="The text 'Hello, World!' displayed in Georgia, a serif font with wider letterforms and stroke contrast optimized for screen readability" />

By using web-safe fonts, you can make sure that your design looks consistent across devices and platforms. They can also enhance accessibility for users with visual disabilities, since they are simple and easy to read. And finally, web-safe fonts can reduce page load time, since they don't have to be downloaded if they're already installed.

Now that you know what web-safe fonts are, you can start using them and assigning them as fallbacks to create reliable user experiences across browsers and platforms.

# --questions--

## --text--

Which of the following is a key characteristic of web-safe fonts?

## --answers--

They are difficult to read.

### --feedback--

Think about the primary advantage of using web-safe fonts.

---

They are designed for specific types of content.

### --feedback--

Think about the primary advantage of using web-safe fonts.

---

They are widely supported across different platforms and browsers.

---

They are only available in serif styles.

### --feedback--

Think about the primary advantage of using web-safe fonts.

## --video-solution--

3

## --text--

Which of the following is not a web-safe font?

## --answers--

`Arial`

### --feedback--

Think about the most common fonts used on the web.

---

`Verdana`

### --feedback--

Think about the most common fonts used on the web.

---

`Georgia`

### --feedback--

Think about the most common fonts used on the web.

---

`Dancing Script`

## --video-solution--

4

## --text--

When are web-safe fonts particularly useful?

## --answers--

For complex and visually demanding web designs.

### --feedback--

Think about the situations where a reliable and universally supported font is needed.

---

When a specific custom font is essential for branding purposes.

### --feedback--

Think about the situations where a reliable and universally supported font is needed.

---

For basic web design and when consistent rendering is a priority.

---

For creating custom fonts.

### --feedback--

Think about the situations where a reliable and universally supported font is needed.

## --video-solution--

3

---

### What Is the @font-face At-Rule, and How Does It Work?
Before we dive in, you should know what an at-rule is in CSS. At-rules are statements that provide instructions to the browser. You can use them to define various aspects of the stylesheet, such as media queries, keyframes, font faces, and more. You'll learn more about concepts like media queries and keyframes in future lessons. This time, you'll learn about the `@font-face` at-rule.

With `@font-face`, you can define a custom font by specifying the font file, format, and other important properties, like weight and style. This is the basic syntax. You can see `@font-face` followed by a block enclosed by curly brackets:

```css
@font-face {
  /* Descriptors */
}
```

Within the curly brackets, you will need to include descriptors to customize your font face. Let's see some of the most commonly used ones. The font-family descriptor specifies the name that you will use throughout the stylesheet to refer to that font. For example, let's say that you define this `@font-face rule`. It has the `font-family` descriptor defined and its value is `MyCustomFont`:

```css
@font-face {
  font-family: "MyCustomFont";
}
```

In that case, you would need to use that name in your stylesheet wherever you want to assign that custom font family to all the elements matched by a CSS selector. For example, you would use it as the value of `font-family`:

```css
body { 
  font-family: "MyCustomFont"; 
}
```

But for the `@font-face` at-rule to be valid, you also need to specify the `src`. This contains references to the font resources. It's basically a list of external references or locally-installed font face names separated by commas. It can also include hints about the format and technology of the font resources.

In the code below, the `src` is defined. The value is a list of URLs separated by commas and placed on separate lines to improve readability:

```css
@font-face {
  font-family: "MyCustomFont"; 
  src: url("path/to/font.woff2"),
    url("path/to/font.woff"),
    url("path/to/font.otf");
}
```

You can call the `url()` function to include a file in your stylesheet. In this case, we are including the font files. You'll need to write the file path within parentheses and quotation marks, including the file extension. To improve readability, you can write each resource on a different line, but the last one should end with a semicolon.

For each font resource, you can also specify the format. This is optional. It's a hint for the browser on the font format. If the format is omitted, the resource will be downloaded and the format will be detected after it's downloaded. If the format is invalid, the resource will not be downloaded.

Possible font formats include `collection`, `embedded-opentype`, `opentype`, `svg`, `truetype`, `woff`, and `woff2`.

Here's an example with font formats. Notice how we write the specific format within parentheses and quotes:

```css
@font-face {
  font-family: "MyCustomFont"; 
  src: url("path/to/font.woff2") format("woff2"),
    url("path/to/font.otf") format("opentype"),
    url("path/to/font.woff") format("woff");
}
```

In this example, you can see that we're specifying the WOFF2 format, the OpenType format, and the WOFF format.

woff stands for "Web Open Font Format." The difference between WOFF and WOFF2 is the algorithm used to compress the data. OpenType is a format for scalable computer fonts developed by Microsoft and Adobe that allows users to access additional features in a font. It's widely used across major operating systems.

In addition to specifying the format, you can also specify the technology of the font resource. This is optional too. Here's an example where we specify the technology of the second font resource.

```css
@font-face {
  font-family: "MyCustomFont"; 
  src: url("path/to/font.woff2") format("woff2"),
    url("path/to/font.otf") format("opentype") tech(color-COLRv1),
    url("path/to/font.woff") format("woff");
}
```

These are the fundamentals of the `@font-face` rule. With this at-rule, you can specify the font file to define custom fonts for your unique designs.

# --questions--

## --text--

What is the primary purpose of the `@font-face` at-rule in CSS?

## --answers--

To define the color of text.

### --feedback--

Think about how to incorporate non-standard fonts into your designs.

---

To control the font size of text.

### --feedback--

Think about how to incorporate non-standard fonts into your designs.

---

To define custom fonts.

---

To adjust the line spacing of text.

### --feedback--

Think about how to incorporate non-standard fonts into your designs.

## --video-solution--

3

## --text--

Which of the following properties is required within the `@font-face` rule to specify the font file?

## --answers--

`font-name`

### --feedback--

Think about how to specify the font file within your stylesheet.

---

`src`

---

`font-weight`

### --feedback--

Think about how to specify the font file within your stylesheet.

---

`font-style`

### --feedback--

Think about how to specify the font file within your stylesheet.

## --video-solution--

2

## --text--

What is the primary advantage of using custom fonts defined with `@font-face` compared to relying solely on web-safe fonts?

## --answers--

Increased browser compatibility.

### --feedback--

Think about how custom fonts can make your design unique.

---

Enhanced customization and branding options.

---

Faster page loading times.

### --feedback--

Think about how custom fonts can make your design unique.

---

Simplified font management.

### --feedback--

Think about how custom fonts can make your design unique.

## --video-solution--

2

---

### How Do You Work with External Fonts Like Font Squirrel and Google Fonts?


---

### What Is the text-shadow Property, and How Does It Work?


---

### Step 1
You've been provided with a basic HTML boilerplate.

Create an `h1` element within your `body` element and give it the text `Nutrition Facts`.

---

### Step 2
Below your `h1` element, add a `p` element with the text `8 servings per container`.

---

### Step 3
Add a second `p` element with the text `Serving size 2/3 cup (55g)`.

---

### Step 4
Within your `head` element, add a `link` element with the `rel` attribute set to `stylesheet` and the `href` attribute set to `https://fonts.googleapis.com/css?family=Open+Sans:400,700,800`.

This will import the `Open Sans` font family, with the font weight values `400`, `700`, and `800`.

Also add a `link` element to link your `styles.css` file.

---

### Step 5
Create a `body` selector and give it a `font-family` set to `Open Sans` with a fallback of `sans-serif`.

Remember that fonts with spaces in the name must be wrapped in quotes for CSS.

---

### Step 6
The font is a bit small. Create an `html` selector and set the font to have a size of `16px`.

---

### Step 7
Wrap your `h1` and `p` elements in a `div` element. Give that `div` a `class` attribute set to `label`.

---

### Step 8
Borders can be used to group and prioritize content.

Create a `.label` selector and give it a `border` set to `2px solid black`.

---

### Step 9
Good use of white space can bring focus to the important elements of your page, and help guide your user's eyes through your text.

Give your `.label` selector a `width` property set to `270px`.

---

### Step 10
Give your `.label` selector a `margin` property set to `20px auto`, and a `padding` property set to `0 7px`.

---

### Step 11
If you inspect your `.label` element with your browser's developer tools, you may notice that it's actually 288 pixels wide instead of 270. This is because, by default, the browser includes the border and padding when determining an element's size.

To solve this, reset the box model by creating a `*` selector and giving it a `box-sizing` property of `border-box`.

---

### Step 12
Remember that the use of `h1`, `h2`, and similar tags determine the semantic structure of your HTML. However, you can adjust the CSS of these elements to control the visual flow and hierarchy.

Create an `h1` rule and set the `font-weight` property to `800`. This will make your `h1` text bolder.

---

### Step 13
Give your `h1` selector a `text-align` property of `center`.

---

### Step 14
Fine-tune the placement of your `h1` by giving it a top and bottom margin of `-4px` and a left and right margin of `0`.

---

### Step 15
Create a `p` selector and remove all margins.

---

### Step 16
Lines can help separate and group important content, especially when space is limited.

Create a `div` element below your `h1` element, and give it a `class` attribute set to `divider`.

---

### Step 17
Create a selector for your new `.divider` and set the `border-bottom` property to `1px solid #888989`. Also give it a top and bottom margin of `2px`. It should not have any left or right margin.

---

### Step 18
The `letter-spacing` property can be used to adjust the space between each character of text in an element.

Give your `h1` selector a `letter-spacing` property set to `0.15px` to space them out a bit more.

---

### Step 19
Nutrition labels have a lot of bold text to draw attention to important information. Rather than targeting each element that needs to be bold, it is more efficient to use a class to apply the bold styling to every element.

Give your second `p` element a `class` attribute set to `bold`.

---

### Step 20
Your new class does not have any styling yet. Create a `.bold` selector and give it a `font-weight` property set to `800` to make the text bold.

Go ahead and remove the `font-weight` property from your `h1` selector as well.

---

### Step 21
Give your `h1` element a `class` attribute set to `bold`. This will make the text bold again.

---

### Step 22
Horizontal spacing between equally important elements can increase the readability of your text.

Wrap the text `2/3 cup (55g)` in a `span` element.

---

### Step 23
Now you can add the horizontal spacing using `flex`. In your `p` selector, add a `display` property set to `flex` and a `justify-content` property set to `space-between`.

---

### Step 24
Wrap everything within the `.label` element in a new `header` element.

---

### Step 25
Now update your `h1` selector to be `header h1` to specifically target your `h1` element within your new `header`.

---

### Step 26
Create a new `div` element below your `header` element, and give it a `class` attribute set to `divider large`.

---

### Step 27
Create a new `.large` selector and give it a `height` property set to `10px`. Also create an `.large, .medium` selector and set the `background-color` property to `black`.

---

### Step 28
You may notice there is still a small border at the bottom of your `.large` element. To reset this, give your `.large, .medium` selector a `border` property set to `0`.

Note: the `medium` class will be utilized later for the thinner bars of the nutrition label.

---

### Step 29
Create a new `div` below your `.large` element and give it a `class` attribute set to `calories-info`.

---

### Step 30
Within your `.calories-info` element, create a `div` element. Give that `div` element a `class` attribute set to `left-container`. Within the newly created `div` element, create an `h2` element with the text `Amount per serving`. Give the `h2` element a `class` attribute set to `bold small-text`.

---

### Step 31
The `rem` unit stands for `root em`, and is relative to the font size of the `html` element.

Create a `.small-text` selector and set the `font-size` to `0.85rem`, which would calculate to roughly `13.6px` (remember that you set your `html` to have a `font-size` of `16px`).

---

### Step 33
Below your `.small-text` element, create a new `p` element with the text `Calories`. Also below the `.left-container` element, create a new `span` element with the text `230`.

---

### Step 35
Create a new `.left-container p` selector setting the top and bottom margin to `-5px`, and the left and right margin to `-2px`. Also set the `font-size` to `2em` and `font-weight` to `700`.

---

### Step 36
Create a `.calories-info span` selector, set its `font-size` to `2.4em` and `font-weight` to `700`.

---

### Step 37
Typography is often more art than science. You may have to tweak things like alignment until it looks correct.

Give your `.calories-info span` selector a `margin` set to `-7px -2px`. This will shift your `230` text into place.

---

### Step 38
Below your `.calories-info` element, add a `div` with the `class` attribute set to `divider medium`.

---

### Step 39
Create an `.medium` selector and give it a `height` property of `5px`.

---

### Step 40
Create a new `div` element below your `.medium` element. Give it a `class` attribute set to `daily-value small-text`. Within this new `div`, add a `p` element with the text `% Daily Value *`, and set the `class` attribute to `bold right`.

---

### Step 42
Use your existing `.divider` element as an example to add a new divider after the `p` element.

---

### Step 43
After your last `.divider` element, create a `p` element and give it the text `Total Fat 8g 10%`. Then, wrap the text `Total Fat` in one `span` element, the text `10%` in another, and give them each a class of `bold`.

---

### Step 45
Below your element with the `Total Fat` text, create a new `p` element with the text `Saturated Fat 1g 5%`. Wrap the `5%` in a `span` with the `class` attribute set to `bold`. In this case this is enough to align the percentage to `5%`.

---

### Step 46
This new `p` element will need to be indented. Give it a `class` set to `indent`.

---

### Step 47
Create a new `.indent` selector and give it a `margin-left` property set to `1em`.

---

### Step 48
Create a `.daily-value p` selector to target all of your `p` elements in the `daily-value` section. Give this new selector a `border-bottom` set to `1px solid #888989`.

---

### Step 49
The bottom borders under your `% Daily Value *` and `Saturated Fat 1g 5%` elements do not extend the full width of the label. Add `no-divider` to the `class` for these two elements.

---

### Step 50
The `:not` pseudo-selector can be used to select all elements that do not match the given CSS rule. 

```css
div:not(#example) {
  color: red;
}
```

The above selects all `div` elements without an `id` of `example`.

Modify your `.daily-value p` selector to exclude the `.no-divider` elements.

---

### Step 51
Now you will have to add separate dividers below your `.no-divider` elements.

Your first `.no-divider` element has a `.divider` after it. Create another `.divider` after your second `.no-divider` element.

---

### Step 52
After your last `.divider`, create another `p` element with the text `Trans Fat 0g`. Italicize the word `Trans` by wrapping it in an `i` element. Give the new `p` element the `class` attribute set to `indent no-divider`. Wrap `Trans Fat 0g` in a `span` element for alignment.

---

### Step 53
Create another `.divider` after your last `p` element.

---

### Step 54
After your last `.divider`, create a new `p` element with the text `Cholesterol 0mg 0%`. Then, wrap the text `Cholesterol` in a `span` element, `0%` in another, and give each of them a class of `bold`.

Finally, nest the `span` element containing the text `Cholesterol` along with the text `0mg`, in an additional `span` element for alignment.

---

### Step 55
Below your last `p` element, create another `p` element with the text `Sodium 160mg 7%`. Put `Sodium` and `7%` each in their own `span` with a class of a `bold` like you did with the others.

Then, add an additional `span` element around `Sodium 160mg` for alignment again.

---

### Step 56
Below your last `p` element, add another `p` element with the text `Total Carbohydrate 37g 13%`. Like before, use `span` elements to make the text `Total Carbohydrate` and `13%` bold. Then, wrap the nutrient and amount in a `span` for alignment again.

---

### Step 57
Below your last `p` element, add another `p` element with the text `Dietary Fiber 4g`. Give the `p` element the `class` necessary to indent it and remove the dividing border. Then create a divider below that `p` element.

---

### Step 58
Create another `p` element after your last `.divider`, and give it the text `Total Sugars 12g`. Assign that `p` element the `class` values necessary to indent it and remove the bottom border. Then create another `.divider` below your new `p` element.

---

### Step 59
The advantage to creating these dividers is that you can apply specific classes to style them individually. Add `double-indent` to the `class` for your last `.divider`.

---

### Step 60
Create a `.double-indent` selector and give it a left margin of `2em`.

---

### Step 61
Below your `.double-indent` element, add a new `p` element with the text `Includes 10g Added Sugars 20%`. Your new `p` element should also be double indented, and have no bottom border. Use a `span` to make the `20%` bold and right aligned.

Then create another divider after that `p` element.

---

### Step 62
After your last divider, create another `p` element with the text `Protein 3g`. Use the necessary classes to remove the bottom border, and a `span` to make the `Protein` bold. Then wrap the text `Protein 3g` including the new `span` element, in a new `span` element.

Following this element, create a large divider.

---

### Step 63
Create another `p` element below your large divider. Give the `p` element the text `Vitamin D 2mcg 10%`.

The `p` element contains only text, you can wrap the percentage in a `span` element so that it is considered a separate entity from the rest of the text, and it's moved to the right.

---

### Step 64
Create another `p` element, give it the text `Calcium 260mg 20%`. Align `20%` to the right. Below that, create a `p` element with the text `Iron 8mg 45%`, aligning the `45%` to the right.

---

### Step 65
Create the final `p` element for your `.daily-value` section. Give it the text `Potassium 235mg 6%`. Align the `6%` text to the right, and remove the bottom border of the `p` element.

---

### Step 66
Add a medium divider after your `.daily-value` element. Below that new divider, create a `p` element with the `class` attribute set to `note`.

Give the `p` element the following text:

```markup
* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
```

---

### Step 67
Create a `.note` selector, and set the size of the font to `0.6rem`. Also set the top and bottom margins to `5px`, removing the left and right margins.

---

### Step 68
Give the `.note` selector a left and right padding of `8px`, removing the top and bottom padding. Also set the `text-indent` property to `-8px`.

With these last changes, your nutrition label is complete!

---

### Step 41
The text `% Daily Value *` should be aligned to the right. Create a `.right` selector and use the `justify-content` property to do it.

---

### Step 32
Create a `.calories-info h2` selector and remove all margins.

---

### Step 34
Create a new `.calories-info` selector and give it a `display` property set to `flex`. Also give it a `justify-content` property set to `space-between` and `align-items` property set to `flex-end`.

---

### Step 44
Notice how the text `8g` appears centered in the preview. Nest the `span` element containing the text `Total Fat` along with the text `8g`, in an additional `span` element for alignment.

---

### Build a Newspaper Article
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should set the root `font-size` of your HTML document to `24px`.
1. You should have an element with a class of `newspaper` that contains all your other elements.
1. Your `.newspaper` element should have a `font-size` of `16px` and a font of `Open Sans` with a fallback font of `sans-serif`.
1. Within your `.newspaper` element, you should have at least seven more elements: one for the newspaper name that has a class of `name`, one for the date of the article with a class of `date`, one for the headline with a class of `headline`, one for the sub-headline with a class of `sub-headline`, one for the author with a class of `author`, and two paragraphs each with a class of `text`. All of these elements should be filled with your article information.
1. Your `.name` element should have a `font-size` that is twice the root element's `font-size` and should use the `Times New Roman` font, with a fallback font of `serif`.
1. Your `.name` and `.author` elements should use CSS to make all their characters uppercase.
1. Your `.headline` element should have a `font-size` that is twice its parent element's `font-size` and should be bold.
1. Your `.sub-headline` element should have a `font-weight` of `100`, a `font-size` that is `1.5` times its parent element's `font-size`, and should be italicized.
1. Your `.author` should use CSS to make it bold.
1. Your `.text` elements should have a `text-indent` of `20px`.
1. Your `.text` elements should have a `line-height` that is twice their parent element's `font-size`.
1. The first letter of your `.text` elements should be bold and twice the size of their parent element's `font-size`. Use the `::first-letter` selector for this.

---

### CSS Typography Review


---

### CSS Typography Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

Which of the following is the correct way to write an `@font-face` rule in CSS?

#### --distractors--

`@font-face { font: 'MyFont'; size: 12px; }`

---

`@font-family { url: 'myfont.ttf'; }`

---

`font-face: 'MyFont', sans-serif;`

#### --answer--

`@font-face { font-family: 'MyFont'; src: url('myfont.woff2'); }`

### --question--

#### --text--

How do the offset values in the CSS `text-shadow` property affect the shadow's appearance?

#### --distractors--

They adjust the weight and color of the shadow.

---

They change the color of the shadow.

---

They remove the text from the path of the shadow.

#### --answer--

They control the position of the shadow relative to the text.

### --question--

#### --text--

What does kerning refer to in the context of typography?

#### --distractors--

How the space between lines of text is adjusted to improve readability and aesthetics.

---

How the overall spacing of a text block is adjusted for visual purposes.

---

How the font size is adjusted for accessibility purposes.

#### --answer--

How the space between specific pairs of characters is adjusted to improve readability and aesthetics.

### --question--

#### --text--

What is a font family in the context of typography?

#### --distractors--

A specific font style used for headings and body text.

---

A collection of text options for formatting text.

---

A set of visually consistent colors used for text.

#### --answer--

A group of fonts that share similar design characteristics.

### --question--

#### --text--

How do you import the `Roboto` font from Google Fonts into your CSS using the `@import` rule?

#### --distractors--

`@font-face { font-family: 'Roboto'; url: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'; }`

---

`link: 'https://fonts.googleapis.com/css2?family=Roboto';`

---

`@import google-font('Roboto');`

#### --answer--

`@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');`

### --question--

#### --text--

Which one of the following is a web safe font?

#### --distractors--

Comic Sans MS

---

Papyrus

---

Impact

#### --answer--

Times New Roman

### --question--

#### --text--

What is the purpose of the `@font-face` rule in CSS?

#### --distractors--

It defines the font size.

---

It creates a fallback font for web pages.

---

It adjusts the line height for text.

#### --answer--

It allows you to use custom fonts by importing them.

### --question--

#### --text--

What is the baseline in the context of typography?

#### --distractors--

The parts of lowercase letters that extend above the `x-height`.

---

The average height of lowercase letters, excluding ascenders and descenders.

---

The height of uppercase letters, measured from the baseline to the top.

#### --answer--

The imaginary line on which most characters rest.

### --question--

#### --text--

Why is it important to include multiple font options in the `font-family` property?

#### --distractors--

It reduces page load time by optimizing the process of loading fonts.

---

It prevents browser compatibility issues by providing multiple options.

---

It makes the web page more engaging and interactive.

#### --answer--

It ensures a consistent user experience in case the custom font doesn't load.

### --question--

#### --text--

What is the purpose of the `text-shadow` property in CSS?

#### --distractors--

It changes the color and font family of the text.

---

It adds a decorative border and background color to the text.

---

It makes the text bold and adjusts the space between the characters.

#### --answer--

It creates a visual effect by adding a blurred or offset duplicate of the text.

### --question--

#### --text--

What is leading in the context of Typography?

#### --distractors--

A group of fonts that share a common design.

---

How space is adjusted between specific pairs of characters in a block of text.

---

How space is adjusted between all characters in a block of text.

#### --answer--

The vertical space between lines of text.

### --question--

#### --text--

Why is typographic hierarchy important in design?

#### --distractors--

It improves the readability of large blocks of text.

---

It ensures consistency across different devices.

---

It ensures that all text elements are the same size.

#### --answer--

It helps organize content and guide users through the information.

### --question--

#### --text--

Which of the following is NOT a CSS property related to fonts?

#### --distractors--

`font-size`

---

`font-weight`

---

`font-family`

#### --answer--

`font-padding`

### --question--

#### --text--

Which of the following is a correct example of the `text-shadow` property in CSS?

#### --distractors--

`text-shadow: solid 5px black;`

---

`text-shadow: 5px blur black;`

---

`text-shadow: inset 2px 2px white;`

#### --answer--

`text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);`

### --question--

#### --text--

What are web safe fonts?

#### --distractors--

Fonts that provide advanced typographic features.

---

Fonts that automatically adjust to the user's preferred settings.

---

Fonts that are specifically designed for print media.

#### --answer--

Fonts that are very likely to be available on most devices and browsers.

### --question--

#### --text--

Why are sans-serif fonts generally considered easier to read on screens than serif fonts?

#### --distractors--

Because they have small lines at the end of characters.

---

Because they are primarily used for decorative purposes.

---

Because they were specifically designed for print media.

#### --answer--

Because they have simple and clean lines.

### --question--

#### --text--

How do you specify multiple font families in the `font-family` property in CSS?

#### --distractors--

By separating them with spaces and listing the preferred font last.

---

By separating them with commas and listing the preferred font last.

---

By enclosing them in curly braces and listing the preferred font first.

#### --answer--

By separating them with commas and listing the preferred font first.

### --question--

#### --text--

In the `@font-face` rule, which property specifies where the font file is located?

#### --distractors--

`font-size`

---

`url`

---

`font-family`

#### --answer--

`src`

### --question--

#### --text--

Which of the following is a good practice when using fonts in web design?

#### --distractors--

Always using at least eight different font families throughout the website.

---

Using decorative fonts for both headings and body text.

---

Avoiding fallback fonts whenever possible.

#### --answer--

Using no more than two or three font families to ensure visual consistency.

### --question--

#### --text--

What is tracking in the context of typography?

#### --distractors--

The parts of lowercase letters that extend below the baseline.

---

The average height of lowercase letters, excluding ascenders and descenders.

---

How space is adjusted between all lines of text in a block of text.

#### --answer--

How space is adjusted between all characters in a block of text.

## --quiz--

### --question--

#### --text--

What is typography?

#### --distractors--

It is the overall design and style of a set of characters, numbers, and symbols.

---

It is about how the individual characters are designed and arranged on a page.

---

It is the specific variation of a typeface with specific characteristics.

#### --answer--

It is the art of choosing fonts and format to make text visually appealing and easy to read.

### --question--

#### --text--

What characteristics does the font weight NOT include?

#### --distractors--

Light

---

Regular

---

Bold

#### --answer--

Italics

### --question--

#### --text--

Which lowercase letter does NOT contain an ascender?

#### --distractors--

`h`

---

`b`

---

`f`

#### --answer--

`g`

### --question--

#### --text--

Which lowercase letter does NOT contain a descender?

#### --distractors--

`y`

---

`g`

---

`q`

#### --answer--

`d`

### --question--

#### --text--

What does tracking affect in typography?

#### --distractors--

It affects the vertical alignment of characters.

---

It affects how complementary fonts are used.

---

It affects the slant and orientation of characters.

#### --answer--

It affects how dense and open the text will be.

### --question--

#### --text--

Where are web safe fonts stored?

#### --distractors--

In the website hosting the web page.

---

In folders on internet servers.

---

In the `styles.css` file.

#### --answer--

In the system files of the computer or device.

### --question--

#### --text--

Which of the following is NOT a valid format for a font?

#### --distractors--

`woff`

---

`collection`

---

`svg`

#### --answer--

`ett`

### --question--

#### --text--

What does the acronym `woff` stand for?

#### --distractors--

Web Only Font Format.

---

Web Open Font Family.

---

Web Only Font Family.

#### --answer--

Web Open Font Format.

### --question--

#### --text--

Which character can you use to separate multiple `text-shadow` property values?

#### --distractors--

`.`

---

`;`

---

`:`

#### --answer--

`,`

### --question--

#### --text--

How is leading measured in typography?

#### --distractors--

From the end of one character to the start of the next character.

---

From the average height of uppercase letters to average height of lowercase letters.

---

From the baseline to the top of uppercase letters.

#### --answer--

From the baseline of one line to the baseline of the next line.

### --question--

#### --text--

What is an example of kerning?

#### --distractors--

Moving the tails of lowercase letters `y` and `g` above the baseline.

---

Adjusting the space between all characters.

---

Adjusting the white space between words.

#### --answer--

Reducing the space between the letters `A` and `V`.

### --question--

#### --text--

What is an example of a serif font?

#### --distractors--

It does not have small lines at the end of characters.

---

It has small dots at the end of characters.

---

It has large dots at the end of characters.

#### --answer--

It has small lines at the end of characters.

### --question--

#### --text--

Which of the following is TRUE about a sans-serif font?

#### --distractors--

It has small dots at the end of characters.

---

It has large dots at the end of characters.

---

It has small lines at the end of characters.

#### --answer--

It does not have small lines at the end of characters.

### --question--

#### --text--

Which example correctly uses the `font-family` property?

#### --distractors--

```css
font-family {
  body: Arial;
}
```

---

```css
body {
  Arial: font-family;
}
```

---

```css
body {
  font-family; Arial:
}
```

#### --answer--

```css
body {
  font-family: Arial;
}
```

### --question--

#### --text--

What is font weight in typography?

#### --distractors--

It is the weight of the font.

---

It is the size of the font.

---

It is the average weight of the characters.

#### --answer--

It is the thickness of the characters.

### --question--

#### --text--

What is a best practice with typography?

#### --distractors--

Choosing commonly used fonts as they can load in a short amount of time.

---

Using metrics to see how many users visit your site and engage with the content.

---

Using unique fonts and images that are eye catching and relevant to the content.

#### --answer--

Choosing clear and simple fonts to make your designs easy to understand.

### --question--

#### --text--

How are font families related?

#### --distractors--

They are developed by the same design team.

---

They are all designed by the same designer.

---

They share the same name but are based on a different typeface.

#### --answer--

They are a group of fonts that share a common design.

### --question--

#### --text--

Which element is used when accessing external fonts?

#### --distractors--

`style`

---

`meta`

---

`head`

#### --answer--

`link`

### --question--

#### --text--

Which of the following can be used to access external fonts?

#### --distractors--

`style`

---

`@font-face`

---

`meta`

#### --answer--

`@import`

### --question--

#### --text--

Which attribute does the `link` element use to access fonts?

#### --distractors--

`rel`

---

`url`

---

`src`

#### --answer--

`href`

---

## css-and-accessibility

### What Are Some Tools to Check for Good Color Contrast on Sites?


---

### What Are Best Practices for Hiding Content So It Doesn't Become Inaccessible?


---

### Step 2
You may be familiar with the `meta` element already; it is used to specify information about the page, such as the title, description, keywords, and author.

Give your page a `meta` element with an appropriate `charset` value.

The `charset` attribute specifies the character encoding of the page, and, nowadays, `UTF-8` is the only encoding supported by most browsers.

---

### Step 3
Continuing with the `meta` elements, a `viewport` definition tells the browser how to render the page. Including one betters visual accessibility on mobile, and improves _SEO_ (search engine optimization).

Add a `viewport` definition with a `content` attribute detailing the `width` and `initial-scale` of the page.

---

### Step 4
Another important `meta` element for accessibility and SEO is the `description` definition. The value of the `content` attribute is used by search engines to provide a description of your page.

Add a `meta` element with the `name` attribute set to `description`, and give it a useful `content` attribute.

---

### Step 5
Lastly in the `head`, the `title` element is useful for screen readers to understand the content of a page. Furthermore, it is an important part of _SEO_.

Give your page a `title` that is descriptive and concise.

---

### Step 6
Navigation is a core part of accessibility, and screen readers rely on you to provide the structure of your page. This is accomplished with semantic HTML elements.

Add a `header` and a `main` element to your page.

The `header` element will be used to introduce the page, as well as provide a navigation menu.

The `main` element will contain the core content of your page.

---

### Step 7
Within the `header`, provide context about the page by nesting one `img`, `h1`, and `nav` element.

The `img` should point to `https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg`, have an `id` of `logo`, and have an `alt` text of `freeCodeCamp`.

The `h1` should contain the text `HTML/CSS Quiz`.

---

### Step 8
Currently, the `img` is assuming its default size, which is too large. CSS has a `max` function which returns the largest of a set of comma-separated values. For example:

```css
img {
  width: max(250px, 25vw);
}
```

In the above example, the width of the image will be 250px if the viewport width is less than 1000 pixels. If the viewport width is greater than 1000 pixels, the width of the image will be 25vw. This is because 25vw is equal to 25% of the viewport width.

Scale the image using its `id` as a selector, and setting the `width` to be the maximum of `10rem` or `18vw`.

---

### Step 9
As described in the <a href="https://design-style-guide.freecodecamp.org/" target="_blank" rel="noopener noreferrer nofollow">freeCodeCamp Style Guide</a>, the logo should retain an aspect ratio of `35 / 4`, and have padding around the text.

First, change the `background-color` to `#0a0a23` so you can see the logo. Then, use the `aspect-ratio` property to set the desired aspect ratio to `35 / 4`. Finally, add a `padding` of `0.4rem` all around.

---

### Step 10
Make the `header` take up the full width of its parent container, set its `height` to `50px`, and set the `background-color` to `#1b1b32`. Then, set the `display` to use _Flexbox_.

---

### Step 11
Change the `h1` font color to `#f1be32`, and set the font size to `min(5vw, 1.2em)`.

---

### Step 12
To enable navigation on the page, add an unordered list with the following three list items:

- `INFO`
- `HTML`
- `CSS`

The list items text should be wrapped in anchor tags.

---

### Step 13
<!-- TODO: I purposefully added the `nav` styles without Camper input -->

The child combinator selector `>` is used between selectors to target only elements that match the second selector and are a direct child of the first selector.

This can be helpful when you have deeply nested elements and want to control the scope of your styling.

Use the `>` selector to target the unordered list elements within the `nav` elements, and use _Flexbox_ to evenly space the children.

---

### Step 14
As this is a quiz, you will need a form for users to submit answers. You can semantically separate the content within the form using `section` elements.

Within the `main` element, create a form containing three `section` elements. Then, make the form submit to `https://freecodecamp.org/practice-project/accessibility-quiz` using the correct method.

---

### Step 15
To increase the page accessibility, the `role` attribute can be used to indicate the purpose behind an element on the page to assistive technologies. The `role` attribute is a part of the _Web Accessibility Initiative_ (WAI), and accepts preset values.

Give each of the `section` elements the `region` role.

---

### Step 16
Every `region` role requires a label, which helps screen reader users understand the purpose of the region. One method for adding a label is to add a heading element inside the region and then reference it with the `aria-labelledby` attribute.

Add the following `aria-labelledby` attributes to the `section` elements:

- `student-info`
- `html-questions`
- `css-questions`

Then, within each `section` element, nest one `h2` element with an `id` matching the corresponding `aria-labelledby` attribute. Give each `h2` suitable text content.

---

### Step 17
Typeface plays an important role in the accessibility of a page. Some fonts are easier to read than others, and this is especially true on low-resolution screens.

Change the font for both the `h1` and `h2` elements to `Verdana`, and use another web-safe font in the sans-serif family as a fallback.

Also, add a `border-bottom` of `4px solid #dfdfe2` to `h2` elements to make the sections distinct.

---

### Step 18
To be able to navigate within the page, give each anchor element an `href` corresponding to the `id` of the `h2` elements.

---

### Step 19
Filling out the content of the quiz, below `#student-info`, add three `div` elements with a `class` of `info`.

Then, within each `div` nest one `label` element, and one `input` element.

---

### Step 20
It is important to link each `input` to the corresponding `label` element. This provides assistive technology users with a visual reference to the input.

This is done by giving the `label` a `for` attribute, which contains the `id` of the `input`.

This section will take a student's name, email address, and date of birth. Give the `label` elements appropriate `for` attributes, as well as text content. Then, link the `input` elements to the corresponding `label` elements.

---

### Step 21
Keeping in mind best-practices for form inputs, give each `input` an appropriate `type` and `name` attribute. Then, give the first `input` a `placeholder` attribute.

---

### Step 22
Even though you added a `placeholder` to the first `input` element in a previous lesson, this is actually not a best-practice for accessibility; too often, users confuse the placeholder text with an actual input value - they think there is already a value in the input.

Remove the placeholder text from the first `input` element, relying on the `label` being the best-practice.

---

### Step 23
Within the second `section` element, add two `div` elements with a class of `question-block`.

Then, within each `div.question-block` element, add one `h3` element with text of incrementing numbers, starting at `1`, and one `fieldset` element with a class of `question`.

---

### Step 24
The question numbers are not descriptive enough. This is especially true for visually impaired users. One way to get around such an issue, without having to add visible text to the element, is to add text only a screen reader can read.

Nest a `span` element with a `class` of `sr-only` before the number in each of the `h3` elements.

---

### Step 25
Within the first `span` element, add the text `Question`.

In the second `span` element, add the text `Question`.

---

### Step 26
The `.sr-only` text is still visible. There is a common pattern to visually hide text for only screen readers to read. 

This pattern is to set the following CSS properties:

```css
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border: 0;
```

Use the above to define the `.sr-only` CSS rule.

---

### Step 27
Each `fieldset` will contain a true/false question.

Within each `fieldset`, nest one `legend` element, and one `ul` element with two options.

---

### Step 28
Give each `fieldset` an adequate `name` attribute. Then, give both unordered lists a `class` of `answers-list`.

Finally, use the `legend` to caption the content of the `fieldset` by placing a true/false question as the text content.

---

### Step 29
To provide the functionality of the true/false questions, we need a set of inputs which do not allow both to be selected at the same time.

Within each list element, nest one `label` element, and within each `label` element, nest one `input` element with the appropriate `type`.

---

### Step 30
Add an `id` to all of your radio `input`s so you can link your labels to them. Give the first one an `id` of `q1-a1`. Give the rest of them `id`s of `q1-a2`, `q2-a1`, and `q2-a2`, respectively.

---

### Step 32
Give the `label` elements text such that the `input` comes before the text. Then, give the `input` elements a `value` matching the text.

The text should either be `True` or `False`.

---

### Step 33
If you click on the radio inputs, you might notice both inputs within the same true/false fieldset can be selected at the same time.

Group the relevant inputs together such that only one input from a pair can be selected at a time.

---

### Step 34
To prevent unnecessary repetition, target the `before` pseudo-element of the `h3` element, and give it a `content` property of `"Question #"`.

---

### Step 35
The final section of this quiz will contain a dropdown, and a text box.

Begin by nesting a `div` with a `class` of `formrow`, and nest four `div` elements inside of it, alternating their `class` attributes with `question-block` and `answer`.

---

### Step 36
Within the `div.question-block` elements, nest one `label` element, and add a `CSS` related question to the `label` text.

---

### Step 37
Within the first `div.answer` element, nest one required `select` element with three `option` elements.

Give the first `option` element a `value` of `""`, and the text `Select an option`. Give the second `option` element a `value` of `yes`, and the text `Yes`. Give the third `option` element a `value` of `no`, and the text `No`.

---

### Step 38
Link the first `label` element to the `select` element, and give the `select` element a `name` attribute.

---

### Step 39
Nest one `textarea` element within the second `div.answer` element, and set the number of rows and columns it has.

---

### Step 40
As with the other `input` and `label` elements, link the `textarea` to its corresponding `label` element, and give it a `name` attribute.

---

### Step 41
Do not forget to give your `form` a submit button with the text `Send`.

---

### Step 42
Two final semantic HTML elements for this project are the `footer` and `address` elements. The `footer` element is a container for a collection of content that is related to the page, and the `address` element is a container for contact information for the author of the page.

After the `main` element, add one `footer` element, and nest one `address` element within it.

---

### Step 43
Within the `address` element, add the following:

```html
freeCodeCamp<br />
San Francisco<br />
California<br />
USA
```

The `br` tags will allow each part of the address to be on its own line and are useful for presenting `address` elements properly.

---

### Step 44
The `address` element does not have to contain a physical geographical location. It can be used to provide a link to the subject.

Wrap a link around the text `freeCodeCamp`, and set its location to `https://freecodecamp.org`.

---

### Step 45
Back to styling the page. Select the list elements within the navigation bar, and give them the following styles:

```css
color: #dfdfe2;
margin: 0 0.2rem;
padding: 0.2rem;
display: block;
```

---

### Step 46
On the topic of visual accessibility, contrast between elements is a key factor. For example, the contrast between the text and the background of a heading should be at least 4.5:1.

Change the font color of all the anchor elements within the list elements to something with a contrast ratio of at least 7:1.

---

### Step 47
To make the navigation buttons look more like typical buttons, remove the underline from the anchor tags.

Then, create a new selector targeting the navigation list elements so that when the cursor hovers over them, the background color and text color are switched, and the cursor becomes a pointer.

---

### Step 48
Tidy up the `header`, by using _Flexbox_ to put space between the children, and vertically center them.

---

### Step 49
When the screen width is small, the `h1` does not wrap its text content how it should. Align the text for the `h1` element in the center.

Then, give the `main` padding such that the `Student Info` section header can be fully seen.

---

### Step 50
On small screens, the unordered list in the navigation bar overflows the right side of the screen.

Fix this by using _Flexbox_ to wrap the `ul` content. Then, set the following CSS properties to correctly align the text:

```css
align-items: center;
padding-inline-start: 0;
margin-block: 0;
height: 100%;
```

---

### Step 51
Set the width of the `section` elements to `80%` of their parent container. Then, use margins to center the `section` elements, adding `10px` to the bottom margin.

Also, ensure the `section` elements cannot be larger than `600px` in width.

---

### Step 52
Replace the top margin of the `h2` elements with `60px` of top padding.

---

### Step 53
Add padding to the top and left of the `.info` elements, and set the other values to `0`.

---

### Step 54
Give the `.formrow` elements top margin, and left and right padding. The other padding values should be `0`.

Then, increase the font size for all `input` elements.

---

### Step 55
To make the first section look more inline, target only the `input` elements within `.info` elements, and set their `width` to `50%`, and left-align their text.

---

### Step 56
Target all `label` elements within `.info` elements, and set their `width` to `10%`, and make it so they do not take up less than `55px`.

---

### Step 57
To align the input boxes with each other, create a new ruleset that targets all `input` and `label` elements within an `.info` element and set the `display` property 
to `inline-block`.

Also, align the `label` element's text to the right.

---

### Step 58
To neaten the `.question-block` elements, set the following CSS properties:

```css
text-align: left;
display: block;
width: 100%;
margin-top: 20px;
padding-top: 5px;
```

---

### Step 59
Make the `h3` elements appear as a higher priority, with the following CSS properties:

```css
margin-top: 5px;
padding-left: 15px;
font-size: 1.375rem;
```

---

### Step 60
It is useful to see the default border around the `fieldset` elements, during development. However, it might not be the style you want.

Remove the border and bottom padding on the `.question` elements.

---

### Step 61
While `ul`/`li` elements are great at providing bullets for list items, your radio buttons don't need them. You can control what the bullets look with the `list-style` property. For example you can turn your bullets into circles with the following:

```css
ul {
  list-style: circle;
}
```

Remove the default styling for the `.answers-list` items by setting its style to `none`, and remove the unordered list padding.

---

### Step 62
Give the submit button a freeCodeCamp-style design, with the following CSS properties:

```css
display: block;
margin: 40px auto;
width: 40%;
padding: 15px;
font-size: 1.438rem;
background: #d0d0d5;
border: 3px solid #3b3b4f;
```

---

### Step 63
Set the `footer` background color to `#2a2a40`, and use _Flexbox_ to horizontally center the text.

---

### Step 64
Now, we cannot read the text. Target the `footer` and the anchor element within to set the font color to a color of adequate contrast ratio.

---

### Step 65
Horizontally center all the text within the `address` element, and add some padding.

---

### Step 66
Clicking on the navigation links should jump the viewport to the relevant section. However, this jumping can be disorienting for some users.

Select all elements, and set the `scroll-behavior` to `smooth`.

---

### Step 67
Finally, certain types of motion-based animations can cause discomfort for some users. In particular, people with <dfn>vestibular</dfn> disorders have sensitivity to certain motion triggers.

The `@media` at-rule has a media feature called `prefers-reduced-motion` to set CSS based on the user's animation preferences. It can take one of the following values:

-   `reduce`
-   `no-preference`

```CSS
@media (feature: value) {
  selector {
    styles
  }
}
```

---

You will learn more about this feature in a future lesson. For now, wrap the style rule that sets `scroll-behavior: smooth` within a `@media` at-rule with the media feature `prefers-reduced-motion` having `no-preference` set as the value.

Well done. You have completed the Accessibility Quiz practice project.

---

### Step 1
For this workshop, you have been provided with a basic boilerplate.

Start this accessibility journey by providing a `lang` attribute to your `html` element. This will assist screen readers in identifying the language of the page.

Also, remember to link your stylesheet to the page.

---

### Step 31
Although not required for `label` elements with a nested `input`, it is still best-practice to explicitly link a `label` with its corresponding `input` element.

Now, add a `for` attribute to each of your four `label`s that links the `label` to its corresponding radio `input`.

---

### Build a Tribute Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. Your tribute page should have a `main` element with a corresponding `id` of `main`, which contains all other elements.
1. You should see an element with an `id` of `title`, which contains a string (i.e. text), that describes the subject of the tribute page (e.g. "Dr. Norman Borlaug").
1. You should see either a `figure` or a `div` element with an `id` of `img-div`.
1. Within the `#img-div` element, you should see an `img` element with a corresponding `id="image"`.
1. Within the `#img-div` element, you should see an element with a corresponding `id="img-caption"` that contains textual content describing the image shown in `#img-div`.
1. You should see an element with a corresponding `id="tribute-info"`, which contains textual content describing the subject of the tribute page.
1. You should see an `a` element with a corresponding `id="tribute-link"`, which links to an outside site, that contains additional information about the subject of the tribute page. HINT: You must give your element an attribute of `target` and set it to `_blank` in order for your link to open in a new tab.
1. Your `#image` should use `max-width` and `height` properties to resize responsively, relative to the width of its parent element, without exceeding its original size.
1. Your `img` element should be centered within its parent element.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### CSS Accessibility Review


---

### CSS Accessibility Quiz
To pass the quiz, you must correctly answer at least 9 of the 10 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

Why do you need to have good color contrast on your webpage?

#### --distractors--

To make the page more vibrant.

---

To meet requirements for search engine optimization (SEO).

---

To make important elements of the page stand out.

#### --answer--

To make the page content accessible and readable.

### --question--

#### --text--

Which of the following tools allows you to enter background and foreground colors and check their contrast ratio?

#### --distractors--

TPGi Colour Contrast Analyzer

---

Figma

---

Canva

#### --answer--

WebAIM's Color Contrast Checker

### --question--

#### --text--

Which of the following tools allows you to pick background and foreground colors from content displayed on your screen and check their contrast ratio?

#### --distractors--

Figma

---

Canva

---

WebAIM's Color Contrast Checker

#### --answer--

TPGi Colour Contrast Analyzer

### --question--

#### --text--

Why should you NOT use `display: none` and `visibility: hidden` to visually hide content?

#### --distractors--

These methods make it so that only assistive technologies like screen readers can access the hidden content.

---

These methods make it so that the content is only hidden until users move their mouse over the content.

---

These methods do not work with some browsers.

#### --answer--

These methods remove the content from the accessibility tree, making it impossible for screen readers to access the hidden content.

### --question--

#### --text--

What is an accessibility tree?

#### --distractors--

A visual representation of the layout of a webpage.

---

A structure used by screen readers to read the text content of a webpage.

---

A copy of the DOM tree.

#### --answer--

A structure used by screen readers to interpret and interact with the content on a webpage.

### --question--

#### --text--

Which of the following ensures that an image has a minimum width of `400px`, but becomes wider when the viewport width is greater than `1000px`?

#### --distractors--

```css
img {
  width: max(400px, 10vw);
}
```

---

```css
img {
  width: max(400px, 30vw);
}
```

---

```css
img {
  width: max(400px, 20vw);
}
```

#### --answer--

```css
img {
  width: max(400px, 40vw);
}
```

### --question--

#### --text--

Which of the following `scroll-behavior` values allows a smooth scrolling behavior?

#### --distractors--

`auto`

---

`inherit`

---

`revert`

#### --answer--

`smooth`

### --question--

#### --text--

Which of the following features is used to detect the user's animation preference?

#### --distractors--

`prefers-contrast`

---

`display-mode`

---

`animation`

#### --answer--

`prefers-reduced-motion`

### --question--

#### --text--

Which of the following is an accessibility issue of the `placeholder` attribute in an `input` element?

#### --distractors--

Placeholder text prevents screen readers from reading the input label text.

---

Placeholder text prevents screen readers from reading the input value.

---

Placeholder text is too small to be readable.

#### --answer--

Placeholder text can be confused with an actual input value.

### --question--

#### --text--

What does the `hidden` attribute do?

#### --distractors--

It hides content and reveals on hover.

---

It hides content only from the accessibility tree.

---

It hides content visually, but the content is available in the accessibility tree.

#### --answer--

It hides content both visually and from the accessibility tree.

---

## css-positioning

### What Are Common Use Cases for Using Floats, and How Do They Work?


---

### What Is Relative Positioning, and How Does This Differ from the Default Static Positioning?


---

### What Is Absolute Positioning, and How Does It Work?


---

### What Is Fixed and Sticky Positioning, and How Does It Differ from Absolute Positioning?


---

### What Is the Z-Index Property, and How Does It Work to Control the Stacking of Positioned Elements?


---

### Step 1
You have been provided with a basic boilerplate. Begin by adding a `link` element within your `head` element. For that `link` element, set the `rel` attribute to `stylesheet` and the `href` to `./styles.css`.

---

### Step 3
Give your `body` element a `background-color` of `#c9d2fc`.

---

### Step 4
Back in your HTML, create a `main` element. Inside that `main` element, add a `div` element with the class `cat-head`.

---

### Step 6
To see the `.cat-head` element, give it a linear gradient background with `#5e5e5e` at `85%` and `#45454f` at `100%`.

You might not notice the difference between these two colors, but they are there.

---

### Step 5
Using a class selector, give the `.cat-head` element a width of `205px` and a height of `180px`. Also, give it a border of `1px solid #000` and a `border-radius` of `46%`.

---

### Step 7
CSS positioning lets you set how you want an element to be positioned in the browser. It has a `position` property you can set to `static`, `absolute`, `relative`, `sticky` or `fixed`.

Once you set the `position` property of the element, you can move the element around by setting a pixel or a percentage value for one or more of the `top`, `right`, `left`, or `bottom` properties.

`static` is the default positioning for all elements. If you assign it to an element, you won't be able to move it around with `top`, `right`, `left`, or `bottom`.

Give `.cat-head` a `position` property of `static`, then set the `top` and `left` properties to `100px` each.

---

### Step 17
Now you should work on the cat's ears. There will be a right and a left ear, and inside each, there will be an inner ear.

Inside your `.cat-head` element, create a `div` element with the class `cat-ears`.

---

### Step 18
Inside your `.cat-ears` element, create two `div` elements with the classes `cat-left-ear` and `cat-right-ear` respectively.

---

### Step 19
Create two `div` elements, the first inside the `.cat-left-ear` element with a class of `cat-left-inner-ear`, and the second inside the `.cat-right-ear` element with a class of `cat-right-inner-ear`.

---

### Step 20
Using a class selector, give the `.cat-right-ear` element `height` and `width` properties set to `100px`. Set the `background-color` to `white`. Set the left and right borders to `35px solid blue`. Set the top and bottom borders to `35px solid red`.

---

### Step 23
Move the left ear into position by setting a position of `absolute`, a `top` of `-26px`, and a `left` of `-31px`.

---

### Step 24
Those edges are too sharp for an ear. So, set the `border-top-left-radius` to `90px` and the `border-top-right-radius` to `10px`.

---

### Step 25
To position the left ear properly, you can use CSS transform to rotate it in a certain degree.

The `transform` property allows you to modify the shape, position, and size of an element without changing the layout or affecting the surrounding elements. It has functions such as `translate()`, `rotate()`, `scale()`, `skew()`, and `matrix()`.

Set the `transform` property to `rotate(-45deg)` and see what happens.

---

### Step 26
Now you can work on the right ear of the cat. You have the HTML for it already.

Using a class selector, give the `.cat-right-ear` element a left and right border of `35px solid transparent` each. Also, set the bottom border to `70px solid #5e5e5e`.

---

### Step 27
Move the right ear into position with a `position` property set to `absolute`, a `top` of `-26px`, and a `left` of `163px`.

---

### Step 28
As you did for the left ear, rotate the right ear at 45 degrees.

---

### Step 29
Remove the sharp border of the right ear by setting the `border-top-left-radius` to `90px` and the `border-top-right-radius` to `10px`.

---

### Step 30
The ears should always be placed above the part of the head it overlaps. You can do this with the `z-index` property.

`z-index` is a property you can use to define the order of overlapping HTML elements. Any element with a higher `z-index` will always be positioned over an element with a lower `z-index`.

To see `z-index` in action, set the `z-index` property of the left ear to `-1`.

---

### Step 31
That's not the behavior you want. You should make the ears display over the head so the borders that overlap with them don't show.

Instead of `-1`, set the `z-index` property of the left ear to `1`.

---

### Step 32
Set the `z-index` property of the right ear to `1` so it always stays over the head.

---

### Step 33
Most cats have different colors in their ear and the inner part of the same ear. You can implement the same too. That's why you defined a `div` element for both right and left inner ears a while ago.

Using a class selector, give your `.cat-left-inner-ear` element a left and right border of `20px solid transparent` each. Also give it a bottom border of `40px solid #3b3b4f`.

---

### Step 34
Move the inner ear into position with a `position` property set to `absolute`, a `top` of `22px`, and a `left` of `-20px`.

---

### Step 35
To remove all the pointed edges of the ear, set a bottom-right and bottom-left border radius of `40%` each, a top-left border radius of `90px`, and a top-right border radius of `10px`.

---

### Step 36
It's time to work on the right inner ear. Using a class selector, give your `.cat-right-inner-ear` element a left and right border of `20px solid transparent`. Also, give it a bottom border of `40px solid #3b3b4f`.

---

### Step 37
Move the right inner ear into position with a `position` property set to `absolute`, a `top` of `22px` and a `left` of `-20px`.

---

### Step 38
As you did for the left inner ear, remove the sharp edges of the right inner ear by setting a bottom-right and bottom-left border radius of `40%`, a top-left border radius of `90px`, and a top-right border radius of `10px`.

---

### Step 39
You will now start working on the cat's eyes. Like the ears, the eyes will have inner eyes.

Create a `div` element with the class `cat-eyes`. Inside the `.cat-eyes` element, create two `div` elements with the class `cat-left-eye` and `cat-right-eye` respectively.

---

### Step 40
Create two `div` elements, one with the class `cat-left-inner-eye` inside the `.cat-left-eye` element and another with the class `cat-right-inner-eye` inside the `.cat-right-eye` element.

---

### Step 41
Using a class selector, give your `.cat-left-eye` element a `width` of `30px` and a `height` of `40px`. Also, give it a `background-color` of `#000`.

---

### Step 42
Move the left eye into position with a `position` property of `absolute`, a `top` of `54px`, and a `left` of `39px`.

---

### Step 43
To make the left eye look like an eye, give it a border radius of `60%`. Also, using the `transform` property, rotate it at `25` degrees.

---

### Step 44
Now you will work on the right eye by using the same approach.

Using a class selector, give your `.cat-right-eye` element a width of `30px` and a height of `40px`. Also, give it a background color of `#000`.

---

### Step 45
Move the right eye into position with a `position` property of `absolute`, a `top` of `54px`, and a `left` of `134px`.

---

### Step 46
To make the right eye look like an eye, give it a border radius of `60%`. Also, using the `transform` property, rotate it at `-25` degrees.

---

### Step 47
Those look like eyes, but you can still make them better. That's why you created two inner eyes `div` elements.

Using a class selector, give your `.cat-left-inner-eye` element a width of `10px` and a height of `20px`. Also, give it a background color of `#fff`.

---

### Step 48
Move the left inner eye into position with a `position` property of `absolute`, a `top` of `8px`, and a `left` of `2px`. Also, give it a border radius of `60%` and rotate it at `10` degrees.

---

### Step 49
Using a class selector, give your `.cat-right-inner-eye` element a width of `10px` and a height of `20px`. Also, give it a background color of `#fff`.

---

### Step 50
Move the right inner eye into position with a `position` of `absolute`, a `top` of `8px`, and a `left` of `18px`. Also, give it a border radius of `60%` and rotate it at `-5deg`.

---

### Step 51
It's time to work on the nose. In your HTML, create a `div` element with the class `cat-nose`.

---

### Step 52
Using a class selector, give your `.cat-nose` element a left and right border of `15px solid transparent` each. Also give it a bottom border of `20px solid #442c2c`.

---

### Step 53
Move the nose into position with a `position` property of `absolute`, a `top` of `108px`, and a `left` of `85px`.

---

### Step 54
Remove the sharp edges of the nose with border radius of `50%` each on the top-left, bottom-right, and bottom-left corners. Also, rotate it at 180 degrees.

---

### Step 55
Now you will start working on the mouth. There will be a right line and left line for the mouth.

Create a `div` element with the class `cat-mouth`.

---

### Step 56
Inside your `.cat-mouth` element, create a `div` element with the class `cat-mouth-line-left` and another `div` with the class `cat-mouth-line-right`.

---

### Step 59
Using a class selector, give your `.cat-mouth-line-left` element a `position` of `absolute`, a `top` of `88px` and a `left` of `74px`. This would move it into the right position.

---

### Step 60
Using the `transform` property, rotate the left mouth line at `170` degrees.

---

### Step 61
Access your `.cat-mouth-line-right` element with a class selector, then move it into the right position with a `position` of `absolute`, a `top` of `88px` and a `left` of `91px`.

---

### Step 62
Rotate the right mouth line at `165` degrees.

---

### Step 63
The last thing you will work on is the whiskers. There are going to be 6 of them, meaning there will be three on each side.

Create a `div` element with the class `cat-whiskers`.

---

### Step 64
Inside the `.cat-whiskers` element, create two `div` elements with the class `cat-whiskers-left` and `cat-whiskers-right`.

---

### Step 65
Inside the `.cat-whiskers-left` element, create three `div` elements with the classes `cat-whisker-left-top`, `cat-whisker-left-middle`, and `cat-whisker-left-bottom`.

---

### Step 66
Inside the `.cat-whiskers-right` element, create 3 `div` elements with the class `cat-whisker-right-top`, `cat-whisker-right-middle`, and `cat-whisker-right-bottom`.

---

### Step 67
Use a descendant selector to target the three `div` elements inside your `.cat-whiskers-left` element. Give it a `width` of `40px`, a `height` of `1px`, and a `background-color` of `#000`.

---

### Step 69
Using a class selector, move the `.cat-whisker-left-top` element into place with a `position` of `absolute`, a `top` of `120px`, and a `left` of `52px`.

---

### Step 70
Rotate the left top whisker at `10` degrees.

---

### Step 71
Use a class selector to target the `.cat-whisker-left-middle` element. Then move it into place with a `position` property set to `absolute`, a `top` of `127px`, and a `left` of `52px`.

---

### Step 72
Rotate the left middle whisker at 3 degrees.

---

### Step 73
Using a class selector, move the `.cat-whisker-left-bottom` into position with a `position` of `absolute`, a `top` of `134px`, and a `left` of `52px`.

---

### Step 74
Rotate the left bottom whisker at `-3` degrees.

---

### Step 75
Now you will work on moving the right whiskers into place. Use class selector to target the `.cat-whisker-right-top` element and give it a `position` of `absolute`, a `top` of `120px`, and a `left` of `109px`.

---

### Step 76
Rotate the top-right whisker at -10 degrees.

---

### Step 77
Use a class selector to target the `.cat-whisker-right-middle` element, then move the right middle whisker into position with a `position` of `absolute`, a `top` of `127px`, and a `left` of `109px`.

---

### Step 78
Rotate the right middle whisker at -3 degrees.

---

### Step 79
Use class selector to target the `.cat-whisker-right-bottom` element, then move it into place with a `position` of `absolute`, a `top` of `134px`, and a `left` of `109px`.

---

### Step 80
Rotate the bottom-right whisker at 3 degrees.

With this final step, your cat painting is now complete.

---

### Step 8
You could see that nothing happens. The `.cat-head` element did not move despite setting a `top` and `left` of `100px` each. But that's not the case with `relative` positioning.

When you use the `relative` value, the element is still positioned according to the normal flow of the document, but the `top`, `left`, `bottom`, and `right` values become active.

Instead of `static`, give your `.cat-head` a position of `relative`, and leave both `top` and `left` properties as they are.

---

### Step 9
When you use the `absolute` value for your `position` property, the element is taken out of the normal flow of the document, and then its position is determined by the `top`, `right`, `bottom`, and `left` properties.

Set the `position` property of your `.cat-head` element to `absolute`, then set `top` and `left` properties to any positive pixel value.

<!-- **Note**: You can experiment with `top`, `left`, `bottom`, and `right` properties here, but the test would only pass for `top` of `300px`, and left of `400px`. -->

---

### Step 10
`fixed` is a `position` property value that lets you make an element fixed to the page no matter where the user scrolls to on the page.

You'll have to do some more markups to see how `fixed` positioning works. In your HTML, create a `div` element with the class `box`.

---

### Step 11
Use a class selector to give your `.box` element a width of `200px`, a height of `600px`, and a background color of `#000`. Also, give it a `position` of `absolute`, a `top` of `800px` and a `left` of `650px`.

---

### Step 12
Now replace the `position` property value of your `.cat-head` with `fixed`. Leave both `top` and `left` as they are.

After that, scroll up and down to see how the `fixed` value works.

---

### Step 13
`sticky` positioning is a hybrid of `relative` and `fixed` positioning. It allows an element to **stick** to a specific position within its containing element or viewport, based on the scroll position.

Change the value of the `position` property of `.cat-head` to `sticky`, set `top` to `0`, then remove `left` and its value.

**Note**: To see how `sticky` works, you have to place a couple of texts before and after your `.cat-head` element. If you scroll down after that, you'll see that the `.cat-head` gets stuck to the top and remains there.

---

### Step 14
You should now center the cat head. 

Give the `.cat-head` element a `position` property set to `absolute`. Set a value of `0` for the `right`, `left`, `top`, `bottom` properties, then set its `margin` property on all sides to `auto`. That's one way to center an element vertically and horizontally using CSS positioning.

---

### Step 16
Also, remove the `.box` CSS rule and its declarations because you don't need them anymore.

---

### Step 2
Use the universal selector to add `box-sizing: border-box;` to your CSS. This ensures elements include padding and border in their specified width and height.

---

### Step 15
Remove the `div` element with class `box` because you don't need it anymore.

---

### Step 57
Using a descendant selector, select the two `div` elements inside the `div` with class `cat-mouth`. Give it a width of `30px`, a height of `50px`, and a border of `2px solid #000`.

---

### Step 58
You are going to make the two mouth lines into an elliptical shape. So, give the `.cat-mouth div` selector a border color of `black transparent transparent transparent` and a border radius of `190%/190px 150px 0 0`.

---

### Step 68
As you did in the previous step, use a descendant selector to target the three `div` elements inside your `.cat-whiskers-right` element. Give it a `width` of `40px`, a `height` of `1px`, and a `background-color` of `#000`.

---

### Step 22
Now you can begin working on your cat's ears.

Clean up your review code by removing the `.cat-right-ear` selector and all of its properties.

Using a class selector, give the `.cat-left-ear` element a left and right border of `35px solid transparent` each. Also, set the bottom border to `70px solid #5e5e5e`.

---

### Step 21
Notice that you now have a white square with thick borders. The borders have diagonal edges which can be used to create triangles. You will need them to create your cat's ears.

Within the same class selector adjust `height` and `width` to `0`. Set the left, right and top border to `transparent`.

Remove the `background-color` property, and you should see a triangle.

---

### Build a House Painting
In this lab, you will use HTML to create the structure of a house. Then, you will use CSS positioning to arrange the elements of your house like windows and doors.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `div` with an `id` of `house`.
1. Your `#house` should have a `position` set to `relative` so its children can be positioned with respect to it.
1. Your `#house` should have a width of `500px` and a height of `400px`. Do not set minimum or maximum values.
1. Your `#house` should have a background color and a border set.
1. You should have five `div` elements inside `#house` with the following `id` values: `chimney`, `roof`, `window-1`, `window-2`, and `door`.
1. All of the immediate children of the `#house` should have a `position` of `absolute`.
1. `#roof`, `#chimney`, `#window-1`, `#window-2`, and `#door` should have a width, height, border, and background color set.
1. Your `#roof` should have a top value of `0`.
1. Your `#door` should be placed at the bottom of your house.
1. Your windows should be placed below your `#roof` and at least higher than one third of your `#door`'s height.
1. Both your windows and your door should have either `left` or `right` set to a value that places them within the house borders.
1. Your `#chimney` should have a top value that puts it at the top of your `#house`.
1. Your `#chimney` should have a `z-index` that puts it behind the house.

**Note:** Be sure to link your stylesheet in your HTML to apply your CSS.

---

### CSS Positioning Review


---

### CSS Positioning Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

Which of the following is NOT a valid value for the `position` property?

#### --distractors--

`fixed`

---

`absolute`

---

`relative`

#### --answer--

`above`

### --question--

#### --text--

What is the main purpose of the `float` property in CSS?

#### --distractors--

Floats are used to remove an element from its normal flow on the page and automatically position it in the upper right hand side of the webpage.

---

Floats are used to remove an element from its normal flow on the page and position it to the top of its container.

---

Floats are used to remove an element from its normal flow on the page and automatically position it to the bottom right hand side of webpage.

#### --answer--

Floats are used to remove an element from its normal flow on the page and position it either on the left or right side of its container.

### --question--

#### --text--

Which of the following is an example making a box element float to the left?

#### --distractors--

```css
.box {
  left: float;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  background-color: black;
}
```

---

```css
.box {
  position: float-left;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  background-color: black;
}
```

---

```css
.box {
  float: left-side;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  background-color: black;
}
```

#### --answer--

```css
.box {
  float: left;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  background-color: black;
}
```

### --question--

#### --text--

What is the role of the `clear` property?

#### --distractors--

It is used to determine if an element needs to be moved to the bottom of the page.

---

It is used to determine if an element needs to be completely cleared from the page.

---

It is used to determine if an element needs to be fixed to the top of the page.

#### --answer--

It is used to determine if an element needs to be moved below the floated content.

### --question--

#### --text--

Which CSS property is used to control the vertical stacking order of positioned elements that overlap on the page?

#### --distractors--

`position`

---

`bg-green`

---

`float`

#### --answer--

`z-index`

### --question--

#### --text--

Which of the following is the correct syntax for relative positioning?

#### --distractors--

```css
.relative {
  position: relative-position;
  top: 30px;
  left: 30px;
}
```

---

```css
.relative {
  relative-position: relative;
  top: 30px;
  left: 30px;
}
```

---

```css
.relative {
  relative: position;
  top: 30px;
  left: 30px;
}
```

#### --answer--

```css
.relative {
  position: relative;
  top: 30px;
  left: 30px;
}
```

### --question--

#### --text--

Which CSS property would you use to fix an element at a certain position on the page so that it does not move when scrolling occurs?

#### --distractors--

`position: no-scroll;`

---

`position: relative;`

---

`display: block;`

#### --answer--

`position: fixed;`

### --question--

#### --text--

What does absolute positioning do to an element?

#### --distractors--

Absolute positioning is used to determine if an element needs to be moved below the floated content.

---

Absolute positioning is used to position the element within the normal document flow.

---

Absolute positioning is used to control the vertical stacking order of positioned elements that overlap on the page.

#### --answer--

Absolute positioning allows you to take an element out of the normal document flow, making it behave independently from other elements.

### --question--

#### --text--

Which of the following is NOT a valid property that you can use for absolute positioning?

#### --distractors--

`right`

---

`bottom`

---

`top`

#### --answer--

`side`

### --question--

#### --text--

What is the key difference between relative and absolute positioning?

#### --distractors--

Absolute positioning sets the element in a sticky position while relative positioning takes an element out of the normal document flow.

---

Relative positioning sets the element in a fixed position while absolute positioning takes an element out of the normal document flow.

---

Absolute positioning positions the element within the normal document flow while relative positioning takes an element out of the normal document flow.

#### --answer--

Relative positioning positions the element within the normal document flow while absolute positioning takes an element out of the normal document flow.

### --question--

#### --text--

Which of the following is an example of positioning a box in the upper left hand corner of the page?

#### --distractors--

```css
.box {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: coral;
  width: 50px;
  height: 50px;
}
```

---

```css
.box {
  position: absolute;
  top: 0;
  right: 0;
  background-color: coral;
  width: 50px;
  height: 50px;
}
```

---

```css
.box {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: coral;
  width: 50px;
  height: 50px;
}
```

#### --answer--

```css
.box {
  position: absolute;
  top: 0;
  left: 0;
  background-color: coral;
  width: 50px;
  height: 50px;
}
```

### --question--

#### --text--

Which positioning method allows an element to stick to a defined position only when you scroll past a certain point?

#### --distractors--

Float positioning.

---

Fixed positioning.

---

Absolute positioning.

#### --answer--

Sticky positioning.

### --question--

#### --text--

Which of the following is a correct example of using sticky positioning?

#### --distractors--

```css
.box {
  sticky: position;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: red;
}
```

---

```css
.box {
  position: sticky-fixed;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: red;
}
```

---

```css
.box {
  position: sticky-top;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: red;
}
```

#### --answer--

```css
.box {
  position: sticky;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: red;
}
```

### --question--

#### --text--

What is the difference between sticky and fixed positioning?

#### --distractors--

Sticky elements can only be used in table layouts while fixed elements can be used in any type of CSS layout.

---

Sticky elements will always remain in the same position while fixed elements will stick to a certain point then behave like relative elements.

---

Fixed elements will be positioned relative to its normal position while sticky elements will only stick to a certain point then behave like relative elements.

#### --answer--

Fixed elements will remain in the same position on the screen while sticky elements will only stick to a certain point then behave like relative elements.

### --question--

#### --text--

What problem did the `clearfix` hack solve when working with floats?

#### --distractors--

The `clearfix` hack helped solve the issue of floated elements being removed from the normal document flow and being placed in a fixed position on the page.

---

The `clearfix` hack helped solve the issue of floated elements not being responsive in mobile and tablet layouts.

---

The `clearfix` hack helped solve the issue of floated elements disappearing from the page.

#### --answer--

The `clearfix` hack helped solve the issue of overlaps and collapsing in the layouts when multiple floated elements were stacked next to each other.

### --question--

#### --text--

Which of the following is a correct example for using the `clearfix` hack?

#### --distractors--

```css
.clearfix::before {
  position: fixed;
  top: 0;
  width: 100%;
  clear: both;
}
```

---

```css
.clearfix::after {
  position: relative;
  top: 30px;
  left: 30px;
  clear: all;
}
```

---

```css
.clearfix::before {
  top: 30px;
  clear: none;
}
```

#### --answer--

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

### --question--

#### --text--

What is static positioning?

#### --distractors--

This is used to remove an element from its normal flow on the page and automatically position it in the upper right hand side of the webpage.

---

This allows you to take an element out of the normal document flow, making it behave independently from other elements.

---

This allows an element to stick to a defined position only when you scroll past a certain point.

#### --answer--

This is the normal flow for the document. Elements are positioned from top to bottom and left to right one after another.

### --question--

#### --text--

Which of the following is an example of setting the navbar to the top of the page using fixed positioning?

#### --distractors--

```css
.navbar {
  fixed: top;
  top: 0;
  width: 100%;
}
```

---

```css
.navbar {
  upper: fixed;
  width: 100%;
}
```

---

```css
.navbar {
  position: fixed-top;
  top: 0;
  width: 100%;
}
```

#### --answer--

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
}
```

### --question--

#### --text--

Which of the following is a valid value to use for the `z-index` property?

#### --distractors--

`12.0`

---

`none`

---

`up`

#### --answer--

`1`

### --question--

#### --text--

Which of the following is the default value of the `position` property?

#### --distractors--

`inherit`

---

`initial`

---

`relative`

#### --answer--

`static`

## --quiz--

### --question--

#### --text--

Which `position` value lets you adjust an element's position with `top` and `left` while keeping it within the normal document flow?

#### --distractors--

`position: absolute;`

---

`position: static;`

---

`position: fixed;`

#### --answer--

`position: relative;`

### --question--

#### --text--

How does an element with `position: sticky;` initially behave?

#### --distractors--

It behaves like a `fixed` element until a scroll position is reached.

---

It is always removed from the normal document flow.

---

It behaves like an `absolute` element within its parent.

#### --answer--

It behaves like a `relative` element until a specified scroll position is met.

### --question--

#### --text--

Which of the following demonstrates a valid and effective use of the `z-index` property to make `.box-two` appear on top of `.box-one`?

#### --distractors--

```css
.box-one {
  position: static;
  z-index: 2;
}
.box-two {
  position: static;
  z-index: 1;
}
```

---

```css
.box-one {
  position: absolute;
  stack-order: 1;
}
.box-two {
  position: absolute;
  stack-order: 2;
}
```

---

```css
.box-one {
  float: left;
  z-index: 1;
}
.box-two {
  float: left;
  z-index: 2;
}
```

#### --answer--

```css
.box-one {
  position: absolute;
  z-index: 1;
}
.box-two {
  position: absolute;
  z-index: 2;
}
```

### --question--

#### --text--

What is the `z-index` property used for in CSS?

#### --distractors--

It sets the zoom level of the page.

---

It controls the horizontal alignment of elements within a flex container.

---

It defines the spacing between an element's content and its border.

#### --answer--

It controls the vertical stacking order of positioned elements that overlap.

### --question--

#### --text--

When you apply `top: 10%;` to an element with `position: fixed;`, what is the `10%` calculated in relation to?

#### --distractors--

The height of the element itself.

---

The height of its parent container.

---

The width of the viewport.

#### --answer--

The height of the viewport.

### --question--

#### --text--

Which of the code examples is a correct use of the `z-index` property to place an overlay above other content?

#### --distractors--

```css
.overlay {
  z-index: 5;
  background-color: black;
}
```

---

```css
.overlay {
  display: block;
  z-layer: 1;
  background-color: black;
}
```

---

```css
.overlay {
  float: left;
  z-index: 2;
  background-color: black;
}
```

#### --answer--

```css
.overlay {
  position: absolute;
  z-index: 10;
  background-color: black;
}
```

### --question--

#### --text--

Which CSS property is used to control whether an element should be moved below floated elements?

#### --distractors--

`float`

---

`overflow`

---

`display`

#### --answer--

`clear`

### --question--

#### --text--

How will an element with `position: relative;` and `bottom: 25px;` be moved?

#### --distractors--

It will move 25px down from its normal position.

---

It will move 25px to the right of its normal position.

---

It will be positioned 25px from the bottom of the viewport.

#### --answer--

It will move 25px up from its normal position.

### --question--

#### --text--

The `z-index` property will only affect elements that have what CSS property applied?

#### --distractors--

A `float` value other than `none`.

---

A `display` value of `inline-block`.

---

A `background-color` set.

#### --answer--

A `position` value other than `static`.

### --question--

#### --text--

What would be the effect of applying `float: right;` to a logo in a header?

#### --distractors--

The logo would be aligned to the right, but would remain in the normal document flow, preventing other content from wrapping.

---

The logo would be taken out of the flow and positioned on the right side of the entire browser viewport, not its container.

---

The logo would become a block-level element that takes up the full width of the header, pushing other elements below it.

#### --answer--

The logo would be removed from its normal flow and placed on the right side of its container, with other content wrapping around it.

### --question--

#### --text--

Which CSS snippet will keep an element fixed to the top of the viewport once it is scrolled to?

#### --distractors--

```css
.header {
  position: fixed;
  top: 0;
}
```

---

```css
.header {
  position: relative;
  top: 0;
}
```

---

```css
.header {
  position: absolute;
  top: 0;
}
```

#### --answer--

```css
.header {
  position: sticky;
  top: 0;
}
```

### --question--

#### --text--

What is the specific purpose of `clear: both;` in CSS?

#### --distractors--

It cancels out the `float` property on the element itself, returning it to the normal document flow.

---

It removes any `clear` properties that were inherited from a parent element, restoring the default floating behavior.

---

It only clears floated elements that are on the right side, allowing left-floated elements to remain as they are.

#### --answer--

It ensures the element is moved below any floated elements that appear before it on both the left and right sides.

### --question--

#### --text--

Given the following code, how will `.child` be positioned?

```css
.parent {
  /* No position property set */
  height: 200px;
}
.child {
  position: absolute;
  top: 10px;
}
```

#### --distractors--

It will be positioned 10px from the top of the `.parent` element, as `absolute` positioning is always relative to the direct parent.

---

It will remain in its default static position because the `absolute` value is invalid without a `z-index` property.

---

It will be positioned 10px from the top of the browser window, remaining fixed in place even when the user scrolls the page.

#### --answer--

It will be positioned 10px from the top of the initial containing block, such as the `<body>`, because its parent is not positioned.

### --question--

#### --text--

What effect will the following CSS have on the `.box` element?

```css
.box {
  position: absolute;
  top: 50px;
  left: 50px;
}
```

#### --distractors--

The element will remain in its normal flow but will be indented by 50px from the top and left, pushing other elements away.

---

The element will be fixed to the viewport and will stay 50px from the top and 50px from the left, even when the page is scrolled.

---

The element will be positioned relative to its own starting point, moving 50px down and 50px to the right without leaving the document flow.

#### --answer--

The element will be taken out of the normal flow and placed 50px from the top and 50px from the left of its nearest positioned ancestor.

### --question--

#### --text--

Which of the following `position` values removes an element entirely from the document's normal flow?

#### --distractors--

`position: static;`

---

`position: relative;`

---

`position: inherit;`

#### --answer--

`position: absolute;`

### --question--

#### --text--

Given a `.parent` and a `.child` element, which CSS snippet will correctly position the `.child` 20px from the top left corner of the `.parent` element?

#### --distractors--

```css
.parent {
  /* position: static; by default */
}
.child {
  position: absolute;
  top: 20px;
  left: 20px;
}
```

---

```css
.parent {
  position: relative;
}
.child {
  position: relative;
  top: 20px;
  left: 20px;
}
```

---

```css
.parent {
  position: relative;
}
.child {
  float: left;
  top: 20px;
  left: 20px;
}
```

#### --answer--

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 20px;
  left: 20px;
}
```

### --question--

#### --text--

What is the difference between `static` and `relative` positioning?

#### --distractors--

`static` positioning removes an element from the document flow, while `relative` positioning keeps it in the flow.

---

An element with `position: static;` can be offset with the `top` and `left` properties, while `position: relative;` cannot.

---

`static` positioning is for block-level elements, while `relative` positioning is only intended for inline elements.

#### --answer--

Both keep an element in the normal document flow, but `relative` allows the element to be offset from its original position.

### --question--

#### --text--

Which CSS snippet correctly floats an image to the left, allowing other content to wrap around it?

#### --distractors--

```css
.image {
  position: absolute;
  left: 0;
}
```

---

```css
.image {
  display: inline-block;
}
```

---

```css
.image {
  text-align: left;
}
```

#### --answer--

```css
.image {
  float: left;
}
```

### --question--

#### --text--

What is the difference between `absolute` and `fixed` positioning?

#### --distractors--

`absolute` positioning is relative to the viewport, while `fixed` positioning is relative to the nearest positioned ancestor.

---

`absolute` positioning keeps the element in the normal document flow, while `fixed` positioning removes it from the flow.

---

Both are positioned relative to the viewport, but `fixed` elements will scroll with the page while `absolute` elements will not.

#### --answer--

`absolute` positioning is relative to the nearest positioned ancestor, while `fixed` positioning is relative to the browser viewport.

### --question--

#### --text--

Which `position` value places an element in the normal document flow and prevents offset properties like `top` and `left` from having any effect?

#### --distractors--

`position: relative;`

---

`position: absolute;`

---

`position: fixed;`

#### --answer--

`position: static;`

---

## attribute-selectors

### What Is the Attribute Selector, and How Can It Be Used to Target Links with the href and title Attributes?


---

### How to Use the Attribute Selector to Target Elements with the lang and data-lang Attributes?


---

### How to Use the Attribute Selector to Target Ordered List Elements with the type Attribute?


---

### Step 1
Begin your project by giving your `head` element a `link` element for your stylesheet.

---

### Step 2
Within your `body` element, nest a `section` element within a `main` element.

---

### Step 3
Within your `section` element, add an `h1` element with a nested `span` element.

---

### Step 4
Screen readers announce HTML elements based on the document flow. We will eventually want the balance sheet to have a heading of "Balance Sheet" and a subheading of "AcmeWidgetCorp". However, this order does not make sense if announced by a screen reader.

Give your existing `span` the `class` attribute set to `flex`, and add two `span` elements within it. Give the first the text `AcmeWidgetCorp`. Give the second the text `Balance Sheet`. You will use CSS to reverse the order of the text on the page, but the HTML order will make more sense for a screen reader.

---

### Step 5
Below your `h1` element, create a `div` element. Give it an `id` attribute set to `years`. You want this particular element to be hidden from screen readers, so give it the `aria-hidden` attribute set to `true`.

---

### Step 6
Within your `div` element, add three `span` elements. Give each of them a `class` attribute set to `year`, and add the following text (in order): `2019`, `2020`, and `2021`.

---

### Step 7
Below your existing `div` element, add a new `div` element with a `class` set to `table-wrap`. This will be the container for your tables.

Within that, add three `table` elements. You will be using CSS to style these into a single table, but using separate tables will help screen readers understand the document flow.

---

### Step 8
HTML tables use the `caption` element to describe what the table is about. The `caption` element should always be the first child of a `table`, but can be positioned with the `caption-side` CSS property.

Add a `caption` element to your first `table`, and give it the text `Assets`.

---

### Step 9
The `thead` and `tbody` elements are used to indicate which portion of your table is the header, and which portion contains the primary data or content.

Add a `thead` and `tbody` to your first `table`, below the `caption` element.

---

### Step 10
The `tr` element is used to indicate a table row. Add a `tr` element within your `thead` element. In your new `tr` element, add a `td` element, followed by three `th` elements.

The `td` element indicates a data cell, while the `th` element indicates a header cell.

---

### Step 11
Within each of your new `th` elements, nest a `span` element with the `class` set to `sr-only year`. Give them the following text (in order): `2019`, `2020`, and `2021`.

Give your third `th` element the `class` attribute set to `current`.

Leave the `td` element empty. This element exists only to ensure your table has a four-column layout and associate the headers with the correct columns.

---

### Step 12
Within your `tbody` element, add four `tr` elements. Give the first three a `class` attribute set to `data`, and the fourth a `class` attribute set to `total`.

---

### Step 13
In your first `tr`, add a `th` element with the text `Cash This is the cash we currently have on hand.`. Wrap all of that text except `Cash ` in a `span` element with the `class` set to `description`.

Following that, add three `td` elements with the following text (in order): `$25`, `$30`, `$28`. Give the third `td` element a `class` attribute set to `current`.

---

### Step 14
In your second `tr` element, add a `th` element with the text `Checking Our primary transactional account.`. Wrap that text, except for `Checking `, in a `span` element with the `class` attribute set to `description`.

Following that, add three `td` elements with the following text (in order): `$54`, `$56`, `$53`. Give the third `td` element a `class` attribute set to `current`.

---

### Step 15
In your third `tr` element, add a `th` element with the text `Savings Funds set aside for emergencies.`. Wrap that text, except for `Savings `, in a `span` element with the `class` attribute set to `description`.

Following that, add three `td` elements with the following text (in order): `$500`, `$650`, `$728`. Give the third `td` element a `class` attribute set to `current`.

---

### Step 16
In your fourth `tr` element, add a `th` element with the text `Total Assets`. Wrap the text `Assets` in a `span` element with the `class` attribute set to `sr-only`.

Following that, add three `td` elements with the following text (in order): `$579`, `$736`, `$809`. Give the third `td` element a `class` attribute set to `current`.

---

### Step 17
Time to move on to your second table. Start by giving it a `caption` element set to `Liabilities`. Then add your `thead` and `tbody`.

---

### Step 18
Within your `thead`, add a `tr`. Inside that, add a `td` and three `th` elements.

---

### Step 19
Give each `th` element a `span` element with the class set to `sr-only` and the following text, in order: `2019`, `2020`, and `2021`.

---

### Step 20
Within the `tbody` element, add four `tr` elements. Give the first three the `class` attribute set to `data`, and the fourth the `class` attribute set to `total`.

---

### Step 21
Within the first `tr`, add a `th` element with the text `Loans The outstanding balance on our startup loan.`. Wrap that text, except for `Loans `, within a `span` element with the `class` set to `description`.

Add three `td` elements below that, and give them the following text, in order: `$500`, `$250`, and `$0`. Give the third `td` element a `class` set to `current`.

---

### Step 22
Within the second `tr`, add a `th` element with the text `Expenses Annual anticipated expenses, such as payroll.`. Wrap that text, except for `Expenses `, within a `span` element with the `class` set to `description`.

Add three `td` elements below that, and give them the following text, in order: `$200`, `$300`, and `$400`. Give the third `td` element a `class` set to `current`.

---

### Step 23
Within the third `tr`, add a `th` element with the text `Credit The outstanding balance on our credit card.`. Wrap that text, except for `Credit `, within a `span` element with the `class` set to `description`.

Add three `td` elements below that, and give them the following text, in order: `$50`, `$50`, and `$75`. Give the third `td` element a `class` set to `current`.

---

### Step 24
In your fourth `tr` element, add a `th` element with the text `Total Liabilities`. Wrap the text `Liabilities` in a `span` element with the `class` attribute set to `sr-only`.

Following that, add three `td` elements with the following text (in order): `$750`, `$600`, `$475`. Give the third `td` element a `class` attribute set to `current`.

---

### Step 25
For your third table, add a `caption` with the text `Net Worth`, and set up a table header and table body.

---

### Step 26
Within your `thead`, create a `tr` element. In that, add a `td` and three `th` elements. Within each of the `th` elements, add a `span` element with the `class` set to `sr-only` and the following text, in order: `2019`, `2020`, and `2021`.

---

### Step 27
Within the `tbody`, add a `tr` with the `class` set to `total`. In that, add a `th` with the text `Total Net Worth`, and wrap `Net Worth` in a `span` with the `class` set to `sr-only`.

Then add three `td` elements, giving the third a `class` set to `current`, and giving each the following text: `$-171`, `$136`, `$334`.

---

### Step 28
Time to style your table. Start by resetting the box model. Create an `html` selector and give it a `box-sizing` property set to `border-box`.

---

### Step 29
Create a `body` selector and give it a `font-family` property set to `sans-serif` and a `color` set to `#0a0a23`.

---

### Step 30
Before you get too far into your styling, you should make use of the `sr-only` class. You can use CSS to make elements with this class completely hidden from the visual page, but still be announced by screen readers.

The CSS you are about to write is a common set of properties used to ensure elements are completely hidden visually.

The `span[class~="sr-only"]` selector will select any `span` element whose `class` _includes_ `sr-only`. Create that selector, and give it a `border` property set to `0`.

---

### Step 31
The CSS `clip` property is used to define the visible portions of an element. Set the `span[class~="sr-only"]` selector to have a `clip` property of `rect(1px, 1px, 1px, 1px)`.

The `clip-path` property determines the shape the `clip` property should take. Set the `clip-path` property to the value of `inset(50%)`, forming the clip-path into a rectangle within the element.

---

### Step 32
Now you need to size these elements down. Give your `span[class~="sr-only"]` selector a `width` and `height` property set to `1px`.

---

### Step 33
To prevent the text content from overflowing, give your `span[class~="sr-only"]` selector an `overflow` property set to `hidden` and a `white-space` property set to `nowrap`.

---

### Step 34
Finally, you need to take these hidden elements out of the document flow. Give the `span[class~="sr-only"]` selector a `position` property set to `absolute`, a `padding` property set to `0`, and a `margin` property set to `-1px`. This will ensure that not only are they no longer visible, but they are not even within the page view.

---

### Step 35
Time to style your table heading. Create an `h1` selector. Give it a `max-width` property set to `37.25rem`, a `margin` property set to `0 auto`, and a `padding` property set to `1.5rem 1.25rem`.

---

### Step 36
Target your flex container with an `h1 .flex` selector. Give it a `display` property set to `flex` to enable the flexbox layout. Then set the `flex-direction` property to `column-reverse` - this will display the nested elements from bottom to top. Finally, set the `gap` property to `1rem` to create some space between the elements.

---

### Step 37
The `:first-of-type` pseudo-selector is used to target the first element that matches the selector. Create an `h1 .flex span:first-of-type` selector to target the first `span` element in your `.flex` container. Remember that your `span` elements are reversed, visually, so this will appear to be the second element on the page.

Give your new selector a `font-size` property of `0.7em` to make it look like a sub-heading.

---

### Step 38
The `:last-of-type` pseudo-selector does the exact opposite - it targets the last element that matches the selector. Create an `h1 .flex span:last-of-type` selector to target the last `span` in your flex container, and give it a `font-size` property set to `1.2em` to make it look like a header.

---

### Step 39
You wrapped your table in a section element - now you can style that to give your table a border. Create a `section` selector, and give it a `max-width` property set to `40rem` for responsive design. Set the `margin` property to `0 auto` to center it, and set the `border` property to `2px solid #d0d0d5`.

---

### Step 40
The last part of your table heading is your years. Create a `#years` selector, and enable flexbox. Justify the content to the end of the flex direction, and make the element sticky. Fix it to the top of its container with `top: 0`.

---

### Step 41
Now apply some color to your `#years`. Make the text `#fff` and the background `#0a0a23`.

---

### Step 42
The `calc()` function is a CSS function that allows you to calculate a value based on other values. For example, you can use it to calculate the width of the viewport minus the margin of an element:

```css
.example {
  margin: 10px;
  width: calc(100% - 20px);
}
```

Give `#years` a `margin` of `0 -2px`, and a `padding` set to `0.5rem calc(1.25rem + 2px) 0.5rem 0`.

---

### Step 44
Style the text within your `#years` element by creating a `#years span[class]` selector. The `span[class]` syntax will target any `span` element that has a `class` attribute set, regardless of the attribute's value.

Give your new selector a `bold` font, a width of `4.5rem`, and text aligned to the right.

---

### Step 45
You wrapped your tables in a container with the `table-wrap` class. Create a selector for that class, and give it a `padding` set to `0 0.75rem 1.5rem 0.75rem`.

---

### Step 46
Before you start diving in to the table itself, your `span` elements are currently bolded. Create a `span:not(.sr-only)` selector and give it a `font-weight` property set to `normal`.

The `:not()` pseudo-selector is used to target all elements that do not match the selector - in this case, any of your `span` elements that do not have the `sr-only` class. This ensures that your earlier rules for the `span[class~="sr-only"]` selector are not overwritten.

---

### Step 47
Rather than having to constantly double-check you are not overwriting your earlier properties, you can use the `!important` keyword to ensure these properties are always applied, regardless of order or specificity.

Give each property in your `span[class~="sr-only"]` selector an `!important` keyword. Do not change any of the values.

---

### Step 48
Now that you have added the `!important` keyword, you can remove the `:not(.sr-only)` from your `span` selector.

---

### Step 49
Create a `table` selector to target your tables. Set the `border-collapse` property to `collapse`, which will allow cell borders to collapse into a single border, instead of a border around each cell. Also set the `border` property to `0` to hide the borders themselves.

---

### Step 50
Ensure your table fills its container with a `width` property set to `100%`, then position it relatively and give it a top margin of `3rem`.

---

### Step 51
Next you need to style your `caption` elements to look more like headers. Create a `table caption` selector. Set the text to have a color of `#356eaf`, a size of `1.3em`, and a normal weight.

---

### Step 52
Now give the captions an absolute position, and shift them `-2.25rem` from the top and `0.5rem` from the left.

---

### Step 53
Create a selector to target your `td` elements within your table body and set their `width` to `4rem`. This will ensure the table body cells have a consistent width and align properly with the columns above.

---

### Step 54
Now target the `th` elements within your table body, and give them a width of the entire container, less `12rem`.

---

### Step 55
The `[attribute="value"]` selector targets any element that has an attribute with a specific value. Create a `tr[class="total"]` selector to target specifically your `tr` elements with the `total` class. Give it a bottom border of `4px double #0a0a23` and make the font bold.

---

### Step 56
Using the same selector syntax, target the `th` elements within your table rows where the `class` is `total`. Align the text to the left, and give them a padding of `0.5rem 0 0.25rem 0.5rem`.

---

### Step 57
The key difference between `tr[class="total"]` and `tr.total` is that the first will select `tr` elements where the _only_ class is `total`. The second will select `tr` elements where the class _includes_ `total`.

In your case, `tr.total` will work. You can use this selector to target all `td` elements within your `.total` rows. Align the text to the right, and give them a padding of `0 0.25rem`.

---

### Step 58
The `:nth-of-type()` pseudo-selector is used to target specific elements based on their order among siblings of the same type. Use this pseudo-selector to target the third `td` element within your `total` table rows. Give it a right padding of `0.5rem`.

---

### Step 59
Give your `tr.total` elements a hover effect that changes the background to `#99c9ff`.

---

### Step 60
Select your `td` elements with the `class` value of `current`, and make the font italic.

---

### Step 61
Select the `tr` elements with the `class` set to `data`. Give them a background image of `linear-gradient(to bottom, #dfdfe2 1.845rem, white 1.845rem)`.

---

### Step 62
Select the `th` elements within your `tr.data` elements. Align the text to the left, and give them a top padding of `0.3rem` and a left padding of `0.5rem`.

---

### Step 63
Create a `tr.data th .description` selector to target the elements with the `class` set to `description` that are within your `th` elements in your `.data` table rows. Give them a block display, make the text italic with a normal weight, and position them with a `padding` set to `1rem 0 0.75rem` and a right margin of `-13.5rem`.

---

### Step 64
Your `span` elements now all have more specific styling, which means you can remove your `span` rule.

---

### Step 65
Your dollar amounts are currently misaligned. Create a selector to target the `td` elements within your `tr.data` elements. Vertically align the text to the top, horizontally align the text to the right, and set the padding to `0.3rem 0.25rem 0`.

---

### Step 66
Create another selector for the `td` elements within your `tr.data` element, but specifically select the last one. Give this a right padding of `0.5rem`.

With this, your balance sheet is complete!

---

### Step 43
Adding position `sticky` moved the element into its own stack. To ensure your `#years` element does not get hidden by different stacks, add a `z-index` property set to `999` in the `#years` rule.

---

### CSS Attribute Selectors Review


---

### CSS Attribute Selectors Quiz
To pass the quiz, you must correctly answer at least 9 of the 10 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What are CSS attribute selectors used for?

#### --distractors--

To apply styles to elements based on their tag name.

---

To apply styles to elements based on their class name.

---

To apply styles to elements based on their parent element.

#### --answer--

To apply styles to elements based on their attributes.

### --question--

#### --text--

Which of the following will NOT be selected by this CSS selector?

```css
[title~="flower"] {
  border: 5px solid yellow;
}
```

#### --distractors--

```html
<img src="img1.jpg" title="clematis flower" width="150" height="113">
```

---

```html
<img src="img2.jpg" title="flower" width="150" height="113">
```

---

```html
<img src="img2.jpg" title="FLOWERS of flower" width="150" height="113">
```

#### --answer--

```html
<img src="img2.jpg" title="flowers" width="150" height="113">
```

### --question--

#### --text--

Which CSS selector matches all `p` elements with a `lang` attribute set to `"fr"`?

#### --distractors--

```css
p[lang-="fr"] { color: blue; }
```

---

```css
p[lang~="fr"] { color: blue; }
```

---

```css
p[lang=="fr"] { color: blue; }
```

#### --answer--

```css
p[lang="fr"] { color: blue; }
```

### --question--

#### --text--

Which CSS selector matches all `a` elements with an `href` attribute?

#### --distractors--

```css
a(href) { color: green; }
```

---

```css
a { color: green; }
```

---

```css
a[href~=""] { color: green; }
```

#### --answer--

```css
a[href] { color: blue; }
```

### --question--

#### --text--

Which CSS selector matches all ordered lists with uppercase Roman numerals?

#### --distractors--

```css
ol[type="a"] { border-color: black; }
```

---

```css
ol[type="A"] { border-color: black; }
```

---

```css
ol[type="i"] { border-color: black; }
```

#### --answer--

```css
ol[type="I"] { border-color: black; }
```

### --question--

#### --text--

What is the `data-lang` attribute commonly used for?

#### --distractors--

To specify the language of the document.

---

To define the character encoding of the document.

---

To set the language of an element based on its parent element.

#### --answer--

To store custom data on an HTML element that CSS or JavaScript can then use.

### --question--

#### --text--

Which CSS selector should you use to style `img` elements only if their `alt` attribute is equal to `"code"`?

#### --distractors--

```css
img[alt~="code"] { border: 1px solid red; }
```

---

```css
img[alt=="code"] { border: 1px solid red; }
```

---

```css
img[alt*="code"] { border: 1px solid red; }
```

#### --answer--

```css
img[alt="code"] { border: 1px solid red; }
```

### --question--

#### --text--

Which CSS selector matches ordered lists with a numerical numbering type?

#### --distractors--

```css
ol[type="i"] { color: purple; }
```

---

```css
ol[type="I"] { color: purple; }
```

---

```css
ol[type="a"] { color: purple; }
```

#### --answer--

```css
ol[type="1"] { color: purple; }
```

### --question--

#### --text--

Which of the following CSS selectors would you use to style `a` elements with both `href` and `title` attributes?

#### --distractors--

```css
a[href] a[title] { text-decoration: underline dotted; }
```

---

```css
a[href]a[title] { text-decoration: underline dotted; }
```

---

```css
a[href].[title] { text-decoration: underline dotted; }
```

#### --answer--

```css
a[href][title] { text-decoration: underline dotted; }
```

### --question--

#### --text--

Which CSS selector would you use if you are developing a website for a restaurant and want to style all elements with the `menu-item` class that have a `data-special` attribute?

#### --distractors--

```css
menu-item[data-special] { background-color: blue; }
```

---

```css
#menu-item[data-special] { background-color: blue; }
```

---

```css
[data-special="menu-item"] { background-color: blue; }
```

#### --answer--

```css
.menu-item[data-special] { background-color: blue; }
```

---

## lab-book-inventory-app

### Build a Book Inventory App
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have an `h1` element with the text `Book Inventory`.
1. You should have a `table` element with columns named `Title`, `Author`, `Category`, `Status`, and `Rate`.
1. Your table should have at least four rows, the first for the column headings and the rest filled with book information.
1. Each table row inside the table body should have either the class `read`, `to-read`, or `in-progress`.
1. `td` elements of the `Status` column should contain a `span` element with the `class` of `status` surrounding the text `Read`, `To Read`, or `In Progress`, depending on the class of that row.
1. `td` elements of the `Rate` column should contain a `span` element with the `class` of `rate` wrapping three empty `span` elements.
1. `.rate` elements placed inside `.read` rows should have an additional class with the value of either `one`, `two`, or `three`, depending on the personal rate. This value should come after `rate`.
1. You should create three attribute selectors to target the elements with the class of `read`, `to-read`, and `in-progress`, and set their `background-image` property to use a `linear-gradient` of your choice.
1. You should set the `display` property of each `span` element to `inline-block`.
1. You should use an attribute selector to target the `span` elements with the class of `status` that are descendants of `tr` elements with the class of `to-read` and set their `border` and `background-image` properties.
1. You should use an attribute selector to target the `span` elements with the class of `status` that are descendants of `tr` elements with the class of `read` and set their `border` and `background-image` properties.
1. You should use an attribute selector to target the `span` elements with the class of `status` that are descendants of `tr` elements with the class of `in-progress` and set their `border` and `background-image` properties.
1. You should use an attribute selector to target the `span` elements with the class of `status` and the `span` elements with the class value starting with `rate` and set their `height`, `width`, and `padding` properties.
1. You should use an attribute selector to target the `span` elements which are direct children of `span` elements with the `class` value starting with `rate` and set their `border`, `border-radius`, `margin`, `height`, `width`, and `background-color` properties.
1. You should use an attribute selector to target the first descendant of `span` elements that have the word `one` as a part of their `class` value and set its `background-image` property to use a `linear-gradient`.
1. You should use an attribute selector to target the first two descendants of `span` elements that have the word `two` as a part of their `class` value and set their `background-image` property to use a `linear-gradient`.
1. You should use an attribute selector to target the three `span` elements that are descendants of `span` elements that have the word `three` as a part of their `class` value and set their `background-image` property to use a `linear-gradient`.

---

## responsive-design

### What Is Responsive Web Design, and What Is Its Relationship to Tools Like CSS Grid and Flexbox?


---

### How Do Media Queries Work, and What Are Some Common Media Types and Features?


---

### What Is the Mobile First Approach in Responsive Web Design?


---

### What Are Media Breakpoints, and What Are Common Breakpoints in Modern Design?


---

### Step 1
Create a `div` element within your `body` element with the `id` set to `piano`.

---

### Step 2
Nest a second `div` within your existing `div`, and set the `class` to be `keys`.

---

### Step 3
Within your `.keys` element, add seven `div` elements, each with the class `key`.

---

### Step 4
Remember, a `class` attribute can hold multiple values. To differentiate between your white and black keys, add a second `class` value of `black--key` to your second, third, fifth, sixth, and seventh `.key` elements.

---

### Step 5
Now, copy the set of seven `.key` elements and paste two additional sets into the `.keys` div.

---

### Step 6
Add a `link` element inside your `head` element. Set its `rel` attribute to `stylesheet` and its `href` attribute to `styles.css`.

---

### Step 7
Browsers often apply default margin and padding values to specific elements. To make sure your piano layout displays correctly, you need to reset the box model.

Add an `html` rule selector to your CSS file, and set the `box-sizing` property to `border-box`.

---

### Step 8
Now that you've reset the html box model, you need to apply this to the elements inside it as well. To do this, you will need to set the `box-sizing` property of all other elements to be inherited, which ensures that the targeted elements adopt the same value as their parent element.

You will also need to target the pseudo-elements, which are special keywords that follow a selector. The two pseudo-elements you will be using are the `::before` and `::after` pseudo-elements.

The `::before` selector creates a pseudo-element which is the first child of the selected element, while the `::after` selector creates a pseudo-element which is the last child of the selected element. These pseudo-elements are often used to create cosmetic content, which you will see later in this project.

For now, create a CSS selector to target all elements using `*`, and include the pseudo-elements `::before` and `::after`. Set the `box-sizing` property to `inherit`.

---

### Step 9
Now target your `#piano` element with an `id` selector. Set its `background-color` property to `#00471b`, the `width` property to `992px` and the `height` property to `290px`.

---

### Step 10
Set the `margin` of the `#piano` to `80px auto`.

---

### Step 11
Time to style the keys. Below the `#piano` rule, target the `.keys` element with a `class` selector. Give the new rule a `background-color` property of `#040404`, a `width` property of `949px` and a `height` property of `180px`.

---

### Step 12
Give the `.keys` a `padding-left` of `2px`.

---

### Step 13
Move the keys into position by adjusting the `#piano` selector. Set the `padding` property to `90px 20px 0 20px`.

---

### Step 14
Time to style the keys themselves. Create a `class` selector for the `.key` elements. Set the `background-color` set to the value `#ffffff`, the `position` property to `relative`, the `width` property to `41px`, and the `height` property to `175px`.

---

### Step 15
Give the `.key` a `margin` of `2px` and a `float` property set to `left`.

---

### Step 16
Now it's time to use the pseudo-selectors you set up earlier. To create the black keys, add a new `.key.black--key::after` selector. This targets elements with both `key` and `black--key` classes and selects the pseudo-element created after these elements in the HTML.

In the new selector, set the `background-color` to `#1d1e22`. Also set the `content` property to `""`. This will make the pseudo-elements empty.

The `content` property is used to set or override the content of an element. By default, the pseudo-elements created by the `::before` and `::after` selectors are empty, which means they are not rendered on the page. By setting the `content` property to an empty string `""`, you ensure that the pseudo-elements are rendered, while still appearing empty.

If you would like to experiment, try removing the `background-color` property and setting different values for the `content` property, such as `"♥"`. Remember to undo these changes when you are done so the tests pass.

---

### Step 17
Give the `.key.black--key::after` a `position` property set to `absolute` and a `left` property set to `-18px`.

---

### Step 18
For the `.key.black--key::after`, set the `width` to `32px` and the `height` to `100px`.

---

### Step 19
The piano needs the freeCodeCamp logo to make it official.

Add an `img` element before your `.keys` element. Give the `img` a `class` of `logo`, and set the `src` to `https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg`. Give it an `alt` text of `freeCodeCamp Logo`.

---

### Step 20
Start styling the logo by creating a `.logo` selector. Set the `width` to `200px`, a `position` of `absolute` and a `top` set to `23px`.

---

### Step 21
The `img` element needs its parent to have a `position` set as a point of reference. Set the `position` of the `#piano` selector to `relative`.

---

### Step 22
To soften the sharp edges of the piano and its keys, start by giving the `#piano` a `border-radius` of `10px`.

---

### Step 23
Give the `.key` selector a `border-radius` value of `0 0 3px 3px`.

---

### Step 24
Give the `.key.black--key::after` selector a `border-radius` of `0 0 3px 3px` to match the keys.

---

### Step 25
The `@media` at-rule, also known as a media query, is used to conditionally apply CSS. Media queries are commonly used to apply CSS based on the viewport width using the `max-width` and `min-width` properties.

In the below example the padding is applied to the `.card` class when the viewport is `960px` wide and below.

```css
@media (max-width: 960px) {
  .card {
    padding: 2rem;
  }
}
```

Add a media query that will be applied when the viewport is `768px` wide and below.

---

### Step 26
Add a new `#piano` selector within your `@media` query, and set the `width` to `358px`.

---

### Step 27
Within the `@media` query, add a `.keys` selector and set the `width` to `318px`.

---

### Step 28
Now add a `.logo` selector to the `@media` query, and set the `width` property to `150px`.

---

### Step 29
You may have noticed that the keys collapse when the browser window is smaller than `768px`. To address this issue, set `overflow` to `hidden` in the first `.keys` selector. This property will hide any elements that are pushed outside the defined `width` of `.keys`, preventing unwanted layout changes.

---

### Step 30
Logical operators can be used to construct more complex media queries. The `and` logical operator is used to query two media conditions.

For example, a media query that targets a display width between 500px and 1000px would be:

```css
@media (min-width: 500px) and (max-width: 1000px){

}
```

Add another `@media` rule to apply if the browser window is wider than `769px` but smaller than `1199px`.

---

### Step 31
For the new `@media` rule, set the `width` of the `#piano` to `675px` and the `width` of the `.keys` to `633px`.

With that, your piano is complete!

---

### Responsive Web Design Review


---

### Responsive Web Design Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What are breakpoints in responsive web design?

#### --distractors--

Specific points in a design where floats overlap with other elements on the page.

---

Specific points used to set the columns and rows for a grid or flex layout.

---

Specific points used to determine how a tabular layout will behave on the page.

#### --answer--

Specific points in a design where the layout and content adjust to accommodate different screen sizes.

### --question--

#### --text--

Which of the following is NOT a breakpoint used for smaller devices?

#### --distractors--

`600px`

---

`480px`

---

`320px`

#### --answer--

`960px`

### --question--

#### --text--

What is the main purpose of using media queries in responsive web design?

#### --distractors--

To change the color scheme of the page for Safari browsers.

---

To create animations for table layouts.

---

To adjust margins and padding for layouts using CSS flexbox.

#### --answer--

To apply different styles based on the screen size or device type.

### --question--

#### --text--

Which media feature in a media query checks the width of the browser window?

#### --distractors--

`set-width`

---

`accept-width`

---

`allow-width`

#### --answer--

`min-width`

### --question--

#### --text--

What will the following code do?

```css
@media screen and (min-width: 768px) {
  /* Styles go here */
}
```

#### --distractors--

This will ignore styles for screens that are `768px` wide.

---

This will apply styles for screens that are only `768px` wide.

---

This will apply styles for screens that are smaller than `768px`.

#### --answer--

This will apply styles for screens that are `768px` and wider.

### --question--

#### --text--

What does mobile-first design emphasize?

#### --distractors--

Designing for smaller devices only and ignoring the others.

---

Designing for mobile devices built by Apple only.

---

Designing for smaller Android screens first and ignoring Apple devices.

#### --answer--

Designing for smaller screens first and scaling up for larger devices.

### --question--

#### --text--

Which media query will apply styles when the device's width is between 600px and 1200px?

#### --distractors--

`@media screen and (max-width: 1200px)`

---

`@media screen and (min-width: 600px)`

---

`@media screen and (width: 800px)`

#### --answer--

`@media screen and (min-width: 600px) and (max-width: 1200px)`

### --question--

#### --text--

Which of the following is NOT a valid media type?

#### --distractors--

`all`

---

`print`

---

`screen`

#### --answer--

`poster`

### --question--

#### --text--

Which of the following media types is intended for paged material and documents viewed on a screen in print preview mode?

#### --distractors--

`aspect-ratio`

---

`flex`

---

`screen`

#### --answer--

`print`

### --question--

#### --text--

What does the `aspect-ratio` do in media queries?

#### --distractors--

It describes the ratio between flex properties in a flex layout.

---

It describes the ratio between the x and y axis for grid containers.

---

It describes the ratio between rows and columns for table layouts.

#### --answer--

It describes the ratio between the width and height of the viewport.

### --question--

#### --text--

Which of the following is used to indicate whether the device is in landscape or portrait orientation?

#### --distractors--

`apply-orientation`

---

`set-orientation`

---

`oriente`

#### --answer--

`orientation`

### --question--

#### --text--

Which of the following is commonly used to target desktop screens and larger?

#### --distractors--

```css
@media screen and (min-width: 140000px) {
  /* Styles go here */
}
```

---

```css
@media screen and (min-width: 140px) {
  /* Styles go here */
}
```

---

```css
@media screen and (min-width: 14000px) {
  /* Styles go here */
}
```

#### --answer--

```css
@media screen and (min-width: 1400px) {
  /* Styles go here */
}
```

### --question--

#### --text--

Which of the following is used to detect if the user has requested a light or dark color theme?

#### --distractors--

`allow-colors-scheme`

---

`apply-color-scheme`

---

`set-colors-scheme`

#### --answer--

`prefers-color-scheme`

### --question--

#### --text--

Which of the following is used to test whether the primary input mechanism can hover over elements?

#### --distractors--

```css
@media (set: hover) {
  /* Styles for devices that support hover */
}
```

---

```css
@media (apply: hover) {
  /* Styles for devices that support hover */
}
```

---

```css
@media (hover: apply) {
  /* Styles for devices that support hover */
}
```

#### --answer--

```css
@media (hover: hover) {
  /* Styles for devices that support hover */
}
```

### --question--

#### --text--

Which of the following is NOT a type of logical operator you can use with media queries?

#### --distractors--

`only`

---

`not`

---

`and`

#### --answer--

`accept`

### --question--

#### --text--

Which of the following breakpoints is commonly used for tablets in responsive web design?

#### --distractors--

`480px`

---

`1920px`

---

`2560px`

#### --answer--

`768px`

### --question--

#### --text--

Which of the following is the correct way to apply the `aspect-ratio` in a media query?

#### --distractors--

```css
@media screen and (aspect-ratio: 16-9) {
  /* Styles for screens with a 16:9 aspect ratio */
}
```

---

```css
@media screen and (aspect-ratio: 16=9) {
  /* Styles for screens with a 16:9 aspect ratio */
}
```

---

```css
@media screen and (aspect-ratio: 16:9) {
  /* Styles for screens with a 16:9 aspect ratio */
}
```

#### --answer--

```css
@media screen and (aspect-ratio: 16/9) {
  /* Styles for screens with a 16:9 aspect ratio */
}
```

### --question--

#### --text--

Which CSS property is used to create a layout that adjusts based on screen size without media queries?

#### --distractors--

`float`

---

`display: block;`

---

`width: 100%;`

#### --answer--

`flex`

### --question--

#### --text--

Which of the following can be used to target landscape screens `768px` and larger?

#### --distractors--

```css
@media screen and (min-width: 768px) and (landscape: orientation) {
  /* Styles go here */
}
```

---

```css
@media screen and (max-width: 768px) and (orientation: landscape) {
  /* Styles go here */
}
```

---

```css
@media screen and (min-width: 768px) and (landscape: set) {
  /* Styles go here */
}
```

#### --answer--

```css
@media screen and (min-width: 768px) and (orientation: landscape) {
  /* Styles go here */
}
```

### --question--

#### --text--

What is the default media type if no media type is specified?

#### --distractors--

`screen`

---

`mobile`

---

`print`

#### --answer--

`all`

## --quiz--

### --question--

#### --text--

Which CSS unit is commonly used in responsive design to create fluid layouts?

#### --distractors--

`px`

---

`em`

---

`rem`

#### --answer--

`%`

### --question--

#### --text--

What is the primary purpose of using media queries in responsive web design?

#### --distractors--

To apply different styles based on user input

---

To make the website load faster

---

To change the website’s color scheme automatically

#### --answer--

To adjust the layout and design based on screen size

### --question--

#### --text--

Which CSS `width` value causes an element to scale proportionally with the width of its parent container, making it suitable for responsive design?

#### --distractors--

`auto`

---

`100vh`

---

`fit-content`

#### --answer--

`100%`

### --question--

#### --text--

Which of the following is an example of a media feature that can be used in a media query?

#### --distractors--

`background-color`

---

`font-size`

---

`text-align`

#### --answer--

`min-width`

### --question--

#### --text--

What does the `@media screen and (max-width: 768px)` media query apply to?

#### --distractors--

It applies styles to screens larger than 768px wide.

---

It applies styles to all screens, regardless of size.

---

It applies styles to screens with a resolution greater than 768dpi.

#### --answer--

It applies styles to screens smaller than 768px wide.

### --question--

#### --text--

Which of the following media query features targets devices with a screen resolution of at least 300dpi?

#### --distractors--

`@media screen and (min-width: 300dpi)`

---

`@media screen and (resolution: 300dpi)`

---

`@media screen and (min-res: 300dpi)`

#### --answer--

`@media screen and (min-resolution: 300dpi)`

### --question--

#### --text--

Which of the following media features would you use to apply styles only when a device does not support hover interactions?

#### --distractors--

`@media (hover: hover)`

---

`@media (hover: auto)`

---

`@media (no-hover: false)`

#### --answer--

`@media (hover: none)`

### --question--

#### --text--

Which of the following is a valid way to target devices with a portrait orientation using a media query?

#### --distractors--

`@media screen and (orientation: landscape) { ... }`

---

`@media (portrait: orientation) { ... }`

---

`@media screen and (min-orientation: portrait) { ... }`

#### --answer--

`@media screen and (orientation: portrait) { ... }`

### --question--

#### --text--

Which media query feature is used to apply styles based on the resolution of the device?

#### --distractors--

`@media (resolution: high) { ... }`

---

`@media screen and (resolution: 300dpi) { ... }`

---

`@media (min-resolution: 150) { ... }`

#### --answer--

`@media (min-resolution: 300dpi) { ... }`

### --question--

#### --text--

What is the purpose of the `@media (hover: hover)` query in CSS?

#### --distractors--

It applies styles only on touch devices.

---

It changes styles based on device orientation.

---

It detects if the device uses a touchscreen.

#### --answer--

It checks if a device supports mouse hover.

### --question--

#### --text--

Which media feature allows you to apply styles only on high pixel density screens like Retina displays?

#### --distractors--

`device-type`

---

`aspect-ratio`

---

`min-width`

#### --answer--

`min-resolution`

### --question--

#### --text--

Which keyword can be used in media queries to combine multiple conditions?

#### --distractors--

if

---

then

---

combine

#### --answer--

and

### --question--

#### --text--

Which CSS technique is commonly used with media queries to apply styles only under specific conditions?

#### --distractors--

Using inline styles for all elements

---

Using JavaScript to detect screen size and apply classes

---

Linking to different HTML files for mobile and desktop

#### --answer--

Combining media features using logical operators like `and` in media queries

### --question--

#### --text--

Which CSS technique helps ensure images scale proportionally on different screen sizes?

#### --distractors--

Using fixed pixel widths for images

---

Setting images as background elements

---

Applying inline styles with exact dimensions

#### --answer--

Setting the image width to a percentage like `width: 100%`

### --question--

#### --text--

What is the purpose of the `@media screen and (min-resolution: 300dpi)` query?

#### --distractors--

To apply styles for screens with a low pixel density.

---

To apply styles based on the screen’s width.

---

To apply styles based on the device's resolution in pixels.

#### --answer--

To apply styles for screens with a high pixel density.

### --question--

#### --text--

Which of the following is true about the mobile-first approach in responsive design?

#### --distractors--

It focuses on designing for large desktop screens first and then scaling down.

---

It designs primarily for tablet screens before scaling down.

---

It only targets smartphones and ignores tablets or desktops.

#### --answer--

It focuses on designing for mobile devices first, then scaling up for larger screens.

### --question--

#### --text--

Which media query feature is used to detect the screen orientation (landscape or portrait)?

#### --distractors--

`aspect-ratio`

---

`device-width`

---

`max-width`

#### --answer--

`orientation`

### --question--

#### --text--

What does the `prefers-color-scheme` media feature detect?

#### --distractors--

`The type of device used for display`

---

`The screen resolution`

---

`The user's preferred font size`

#### --answer--

`Whether the user prefers a light or dark theme`

### --question--

#### --text--

What does the `orientation` media feature detect?

#### --distractors--

`The width of the screen`

---

`The resolution of the display`

---

`The type of device (tablet, phone, etc.)`

#### --answer--

`Whether the device is in landscape or portrait mode`

### --question--

#### --text--

What is the correct syntax to apply styles for devices with at least 2x pixel density?

#### --distractors--

`@media (resolution: 2x)`

---

`@media screen and (pixel-ratio: 2)`

---

`@media (dpi: 300)`

#### --answer--

`@media screen and (min-resolution: 192dpi)`

---

## lab-technical-documentation-page

### Build a Technical Documentation Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You can see a `main` element with a corresponding `id="main-doc"`, which contains the page's main content (technical documentation).
1. Within the `#main-doc` element, you can see several `section` elements, each with a class of `main-section`. There should be a minimum of five.
1. The first element within each `.main-section` should be a `header` element, which contains text that describes the topic of that section.
1. Each `section` element with the class of `main-section` should also have an `id` that corresponds with the text of each `header` contained within it. Any spaces should be replaced with underscores (e.g. The section that contains the header "JavaScript and Java" should have a corresponding `id="JavaScript_and_Java"`).
1. The `.main-section` elements should contain at least ten `p` elements total (not each).
1. The `.main-section` elements should contain at least five `code` elements total (not each).
1. The `.main-section` elements should contain at least five `li` items total (not each).
1. You can see a `nav` element with a corresponding `id="navbar"`.
1. The navbar element should contain one `header` element which contains text that describes the topic of the technical documentation.
1. Additionally, the navbar should contain link (`a`) elements with the class of `nav-link`. There should be one for every element with the class `main-section`.
1. The `header` element in the `#navbar` must come before any link (`a`) elements in the navbar.
1. Each element with the class of `nav-link` should contain text that corresponds to the `header` text within each `section` (e.g. if you have a "Hello world" section/header, your navbar should have an element which contains the text "Hello world").
1. When you click on a navbar element, the page should navigate to the corresponding section of the `#main-doc` element (e.g. If you click on a `.nav-link` element that contains the text "Hello world", the page navigates to a `section` element with that id, and contains the corresponding header).
1. On regular sized devices (laptops, desktops), the element with `id="navbar"` should be shown on the left side of the screen and should always be visible to the user.
1. Your technical documentation should use at least one media query.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

## css-variables

### What Are CSS Custom Properties, and How Do They Work?


---

### What Is the @property Rule, and How Does It Work with Fallbacks?


---

### Step 1
Welcome to the CSS Variables Skyline project! Start by adding a `link` element that links your `styles.css` file within the `head` element.

---

### Step 2
In CSS, you can target everything with an asterisk. Add a border to everything by using the `*` selector, and giving it a `border` of `1px solid black`. This is a trick that helps visualize where elements are and their size. You will remove this later.

---

### Step 3
Also add a `box-sizing` of `border-box` to everything. This will make it so the border you added doesn't add any size to your elements.

---

### Step 4
You can see the `body` (it's the inner-most box on your page); the box around it is the `html` element. Make your `body` fill the whole viewport by giving it a `height` of `100vh`. Remove the default `margin` from the `body` by setting the `margin` to `0`. Finally, set the `overflow` property to `hidden` to hide any scroll bars that appear when something extends past the viewport.

---

### Step 5
Create a `div` element in the `body` with a class of `background-buildings`. This will be a container for a group of buildings.

---

### Step 6
Give your `.background-buildings` element a `width` and `height` of `100%` to make it the full width and height of its parent, the `body`.

---

### Step 7
Nest a `div` with a class of `bb1` in the background buildings container. Open your `styles.css` file, and give `.bb1` a `width` of `10%` and `height` of `70%`. "bb" stands for "background building", this will be your first building.

---

### Step 8
Nest four `div` elements in the `.bb1` container. Give them the classes `bb1a`, `bb1b`, `bb1c`, and `bb1d` in that order. This building will have four sections.

---

### Step 9
Give the parts of your building `width` and `height` properties with these values: `70%` and `10%` to `.bb1a`, `80%` and `10%` to `.bb1b`, `90%` and `10%` to `.bb1c`, and `100%` and `70%` to `.bb1d`. Remember that these percentages are relative to the parent and note that the heights will add up to 100% - vertically filling the container.

---

### Step 10
Center the parts of your building by turning the `.bb1` element into a flexbox parent. Use the `flex-direction` and `align-items` properties to center the children.

---

### Step 11
Now you have something that is resembling a building. You are ready to create your first variable. In previous lessons you learned that variable declarations begin with two dashes (`-`) and are given a name and a value like this: `--variable-name: value;`. In the rule for the `bb1` class, create a variable named `--building-color1` and give it a value of `#999`.

---

### Step 12
To use a variable, put the variable name in parentheses with `var` in front of them like this: `var(--variable-name)`. Whatever value you gave the variable will be applied to whatever property you use it on. 

Add the variable `--building-color1` you created in the previous step as the value of the `background-color` property of the `.bb1a` class.

---

### Step 13
Use the same variable as the `background-color` of the `.bb1b`, `.bb1c`, and `.bb1d` classes to fill in the rest of the building.

---

### Step 14
Change the value of your variable from `#999` to `#aa80ff` and you can see how it gets applied everywhere you used the variable. This is the main advantage of using variables, being able to quickly change many values in your stylesheet by just changing the value of a variable.

---

### Step 15
Your first building looks pretty good now. Nest three new `div` elements in the `.background-buildings` container and give them the classes of `bb2`, `bb3`, and `bb4` in that order. These will be three more buildings for the background.

---

### Step 16
Give the new buildings `width` and `height` properties of: `10%` and `50%` for `.bb2`, `10%` and `55%` for `.bb3`, and `11%` and `58%` for `.bb4`. You will be using almost all percent based units and some flexbox for this project, so everything will be completely responsive.

---

### Step 17
The buildings are currently stacked on top of each other. Align the buildings by turning the `.background-buildings` element into a flexbox parent. Use the `align-items` and `justify-content` properties to evenly space the buildings across the bottom of the element.

---

### Step 18
The buildings are too spaced out. Squeeze them together by adding two empty `div` elements to the top of the `.background-buildings` element, two more at the bottom of it, and one more in between `.bb3` and `.bb4`. These will be added as evenly-spaced elements across the container, effectively moving the buildings closer to the center.

---

### Step 19
Create a new variable below your `--building-color1` variable. Name your new variable `--building-color2` and give it a value of `#66cc99`. Then set it as the `background-color` of `.bb2`.

---

### Step 20
That didn't work. You should add a fallback value to a variable by putting it as the second value of where you use the variable like this: `var(--variable-name, fallback-value)`. The property will use the fallback value when there's a problem with the variable. Add a fallback value of `green` to the `background-color` of `.bb2`.

---

### Step 21
Create a new variable below the other ones named `--building-color3` and give it a value of `#cc6699`. Then use it as the `background-color` of the `.bb3` class and give it a fallback value of `pink`.

---

### Step 22
That didn't work, because the variables you declared in `.bb1` do not cascade to the `.bb2` and `.bb3` sibling elements. That's just how CSS works. Because of this, variables are often declared in the `:root` selector. This is the highest level selector in CSS; putting your variables there will make them usable everywhere. Add the `:root` selector to the top of your stylesheet, and move all your variable declarations there.

---

### Step 23
Now that you've worked the bugs out and the buildings are the right colors, you can remove the fallback values in the two places they were used. Go ahead and do that now.

---

### Step 24
Create another variable named `--building-color4` and give it a value of `#538cc6`. Make sure it's in the `:root` selector this time. Then use it to fill in the last building.

---

### Step 25
The background buildings are starting to look pretty good. Create a new `div` below the `.background-buildings` element and give it a class of `foreground-buildings`. This will be another container for more buildings.

---

### Step 26
You want the `.foreground-buildings` container to sit directly on top of the `.background-buildings` element. Give it a `width` and `height` of `100%`, set the `position` to `absolute`, and the `top` to `0`. This will make it the same size as the body and move the start of it to the top left corner.

---

### Step 27
Nest six `div` elements within `.foreground-buildings` and give them the classes of `fb1` through `fb6` in that order. "fb" stands for "foreground building". These will be six more buildings for the foreground.

---

### Step 28
Give the six new elements these `width` and `height` values: `10%` and `60%` to `.fb1`, `10%` and `40%` to `.fb2`, `10%` and `35%` to `.fb3`, `8%` and `45%` to `.fb4`, `10%` and `33%` to `.fb5`, and `9%` and `38%` to `.fb6`.

---

### Step 29
Add the same `display`, `align-items`, and `justify-content` properties and values to `.foreground-buildings` that you used on `.background-buildings`. Again, this will use Flexbox to evenly space the buildings across the bottom of their container.

---

### Step 30
You should optimize your code. Move the `position` and `top` properties and values from `.foreground-buildings` to `.background-buildings`. Then select both `.background-buildings` and `.foreground-buildings` there, effectively applying those styles to both of the elements. You can use a comma (`,`) to separate selectors like this: `selector1, selector2`.

---

### Step 31
Now that you did that, you can delete the old `.foreground-buildings` declaration and all of its properties since they aren't needed anymore.

---

### Step 32
The skyline is coming together. Fill in the `background-color` property of the foreground buildings. Use your `--building-color1` variable to fill in `.fb3` and `.fb4`, `--building-color2` for `.fb5`, `--building-color3` for `.fb2` and `.fb6`, and `--building-color4` for `.fb1`.

---

### Step 33
Squeeze the buildings together again by adding two empty `div` elements within both the top and bottom of the `.foreground-buildings` element, and one more in between `.fb2` and `.fb3`.

---

### Step 34
Move the position of `.fb4` relative to where it is now by adding a `position` of `relative` and `left` of `10%` to it. Do the same for `.fb5` but use `right` instead of `left`. This will cover up the remaining white space in between the buildings.

---

### Step 35
Your code is starting to get quite long. Add a comment above the `.fb1` class that says `FOREGROUND BUILDINGS - "fb" stands for "foreground building"` to help people understand your code. Above the `.bb1` class add another comment that says `BACKGROUND BUILDINGS - "bb" stands for "background building"`. If you don't remember, comments in CSS look like this: `/* Comment here */`.

---

### Step 36
Create a new variable in `:root` called `--window-color1` and give it a value of `black`. This will be a secondary color for the purple buildings.

---

### Step 37
In a previous module you learned that gradients in CSS are a way to transition between colors across the distance of an element. They are applied to the `background` property and the syntax looks like this:

```css
gradient-type(
  color1,
  color2
);
```

In the example, `color1` is solid at the top, `color2` is solid at the bottom, and in between it transitions evenly from one to the next. In `.bb1a`, add a `background` property below the `background-color` property. Set it as a gradient of type `linear-gradient` that uses `--building-color1` as the first color and `--window-color1` as the second.

---

### Step 38
You want to add the same gradient to the next two sections. Instead of doing that, create a new class selector called `bb1-window`, and move the `height` and `background` properties and values from `.bb1a` to the new class selector.

---

### Step 39
Add the new `bb1-window` class to the `.bb1a`, `.bb1b`, and `.bb1c` elements. This will apply the gradient to them.

---

### Step 40
You don't need the `height` or `background-color` properties in `.bb1a`, `.bb1b` or `.bb1c` anymore, so go ahead and remove them.

---

### Step 41
Gradients can use as many colors as you want like this:

```css
gradient-type(
  color1,
  color2,
  color3
);
```

Add a `linear-gradient` to `.bb1d` with `orange` as the first color, `--building-color1` as the second, and `--window-color1` as the third. Remember to use the gradient on the `background` property.

---

### Step 42
It's a little hidden behind the foreground buildings, but you can see the three color gradient there. Since you are using that now, remove the `background-color` property from `.bb1d`.

---

### Step 43
You can specify where you want a gradient transition to complete by adding it to the color like this:

```css
gradient-type(
  color1,
  color2 20%,
  color3
);
```

Here, it will transition from `color1` to `color2` between `0%` and `20%` of the element and then transition to `color3` for the rest. Add `80%` to the `--building-color1` color of the `.bb1d` gradient so you can see it in action.

---

### Step 44
Remove `orange` from the `.bb1d` gradient and change the `80%` to `50%`. This will make `--building-color1` solid for the top half, and then transition to `--window-color1` for the bottom half.

---

### Step 45
Nest two new `div` elements within `.bb2`, give them the classes of `bb2a` and `bb2b`, in that order. These will be two sections for this building.

---

### Step 46
Give `.bb2b` a `width` and `height` of `100%` to make it fill the building container. You will add something on the top a little later.

---

### Step 47
Create a new variable in `:root` named `window-color2` with a value of `#8cd9b3`. This will be used as the secondary color for this building.

---

### Step 48
Gradient transitions often gradually change from one color to another. When a more abrupt change is required, the transition can be made with a hard stop like this:

```css
linear-gradient(
  var(--first-color) 0%,
  var(--first-color) 40%,
  var(--second-color) 40%,
  var(--second-color) 80%
);
```

Add a `linear-gradient` to `.bb2b` that uses `--building-color2` from `0%` to `6%` and `--window-color2` from `6%` to `9%`.

---

### Step 49
You can see the hard color change at the top of the section. Change the gradient type from `linear-gradient` to `repeating-linear-gradient` for this section. This will make the four colors of your gradient repeat until it gets to the bottom of the element; giving you some stripes, and saving you from having to add a bunch of elements to create them.

---

### Step 50
In the next few steps, you are going to use some tricks with CSS borders to turn the `.bb2a` section into a triangle at the top of the building. First, remove the `background-color` from `.bb2` since you don't need it anymore.

---

### Step 51
Create and add the following properties to `.bb2a`:

```css
margin: auto;
width: 5vw;
height: 5vw;
border-top: 1vw solid #000;
border-bottom: 1vw solid #000;
border-left: 1vw solid #999;
border-right: 1vw solid #999;
```

After you add these, you can see how a thick border on an element gives you some angles where two sides meet. You are going to use that bottom border as the top of the building.

---

### Step 52
Next, remove the `width` and `height` from `.bb2a`, and change the `border-left` and `border-right` to use `5vw` instead of `1vw`. The element will now have zero size and the borders will come together in the middle.

---

### Step 53
Next, change the two `#999` of `.bb2a` to `transparent`. This will make the left and right borders invisible.

---

### Step 54
Remove the `margin` and `border-top` properties and values from `.bb2a` to turn it into a triangle for the top of the building.

---

### Step 55
Finally, on the `border-bottom` property of `.bb2a`, change the `1vw` to `5vh` and change the `#000` color to your `--building-color2` variable. There you go, now it looks good! At any time throughout this project, you can comment out or remove the `border` property you added to everything at the beginning to see what the buildings will look like when that gets removed at the end.

---

### Step 56
On to the next building! Create a new variable called `--window-color3` in `:root` and give it a value of `#d98cb3`. This will be the secondary color for the pink buildings.

---

### Step 57
So far, all the gradients you created have gone from top to bottom, that's the default direction. You can specify another direction by adding it before your colors like this:

```css
gradient-type(
  direction,
  color1,
  color2
);
```

Fill in `.bb3` with a `repeating-linear-gradient`. Use `90deg` for the direction, your `building-color3` for the first two colors, and `window-color3` at `15%` for the third. When you don't specify a distance for a color, it will use the values that make sense. In this case, the first two colors will default to `0%` and `7.5%` because it starts at `0%`, and `7.5%` is half of the `15%`.

---

### Step 58
Remove the `background-color` property and value from `.bb3` since you are using the gradient as the background now.

---

### Step 59
The next building will have three sections. Nest three `div` elements within `.bb4`. Give them the classes of `bb4a`, `bb4b` and `bb4c` in that order.

---

### Step 60
Give the new `div` elements these `width` and `height` values: `3%` and `10%` to `.bb4a`, `80%` and `5%` to `.bb4b`, and `100%` and `85%` to `.bb4c`.

---

### Step 61
Remove the `background-color` property and value from `.bb4`, and add it to the three new sections `.bb4a`, `.bb4b`, and `.bb4c`, so only the sections are filled.

---

### Step 62
You want `.bb4` to share the properties of `.bb1` that center the sections. Instead of duplicating that code, create a new class above the background building comment called `building-wrap`. Leave it empty for now; this class will be used in a few places to save you some coding.

---

### Step 63
Move the `display`, `flex-direction`, and `align-items` properties and values from `.bb1` to the new `building-wrap` class.

---

### Step 64
Add the new `building-wrap` class to the `.bb1` and `.bb4` elements. This will apply the centering properties to the buildings that need it.

---

### Step 65
Create a new variable called `--window-color4` in `:root` and give it a value of `#8cb3d9`. This will be the secondary color for the last background building.

---

### Step 66
Nest four new `div` elements within `.bb4c`, give them all the class of `bb4-window`. These will be windows for this building.

---

### Step 67
Give the `bb4-window` class a `width` of `18%`, a `height` of `90%`, and add your `--window-color4` variable as the `background-color`.

---

### Step 68
The windows are stacked on top of each other at the left of the section, behind the purple building. Add a new class below `.building-wrap` called `window-wrap`. Make `.window-wrap` a flexbox container, and use the `align-items` and `justify-content` properties to center its child elements vertically and evenly space them in their parent, respectively.

---

### Step 69
Add the new `window-wrap` class to the `.bb4c` element.

---

### Step 70
Looks good! On to the foreground buildings! Turn the `.fb1` building into three sections by nesting three new `div` elements within it. Give them the classes of `fb1a`, `fb1b` and `fb1c`, in that order.

---

### Step 71
Give `.fb1b` a `width` of `60%` and `height` of `10%`, and `.fb1c` a `width` of `100%` and `height` of `80%`.

---

### Step 72
Add the `building-wrap` class to the `.fb1` element to center the sections.

---

### Step 73
Move the `background-color` property and value from `.fb1` to `.fb1b`.

---

### Step 103
You don't need the `background-color` for this building anymore so you can remove that property.

---

### Step 74
Don't worry about the space at the bottom, everything will get moved down later when you add some height to the element at the top of the building.

Add a `repeating-linear-gradient` to `.fb1c` with a `90deg` angle, your `--building-color4` from `0%` to `10%` and `transparent` from `10%` to `15%`.

---

### Step 75
You can add multiple gradients to an element by separating them with a comma (`,`) like this:

```css
gradient1(
  colors
),
gradient2(
  colors
);
```

Add a `repeating-linear-gradient` to `.fb1c` below the one that's there; use your `--building-color4` from `0%` to `10%` and `--window-color4` from `10%` and `90%`. This will fill in behind the gradient you added last.

---

### Step 76
You're going to use some more border tricks for the top section. Add a `border-bottom` with a value of `7vh solid var(--building-color4)` to `.fb1a`. This will put a `7vh` height border on the bottom. But since the element has zero size, it only shows up as a 2px wide line from the 1px border that is on all the elements.

---

### Step 77
When you increase the size of the left and right borders, the border on the bottom will expand to be the width of the combined left and right border widths. Add `2vw solid transparent` as the value of the `border-left` and `border-right` properties of `.fb1a`. They will be invisible, but it will make the border on the bottom `4vw` wide.

---

### Step 78
On to the next building! Nest two `div` elements within `.fb2` and give them classes of `fb2a` and `fb2b`, in that order.

---

### Step 79
Give `.fb2a` a `width` of `100%` and `.fb2b` a `width` of `100%` and `height` of `75%`.

---

### Step 80
Nest three `div` elements within `.fb2b` and give them a class of `fb2-window`. These will be windows for this section of the building.

---

### Step 81
Add your `window-wrap` class to `.fb2b` to position the new window elements.

---

### Step 82
Give the `.fb2-window` elements a `width` of `22%`, `height` of `100%`, and a `background-color` of your `--window-color3` variable.

---

### Step 83
Move the `background-color` property and value from `.fb2` to `.fb2b` to just color the section and not the container.

---

### Step 84
For `.fb2a`, add a `border-bottom` of `10vh solid var(--building-color3)`, and a `border-left` and `border-right` of `1vw solid transparent`. This time the border trick will create a trapezoid shape.

---

### Step 85
For the next building, nest four `div` elements within `.fb3` with classes of `fb3a`, `fb3b`, `fb3a` again, and `fb3b` again, in that order. This building will have four sections, and the top two will be almost the same as the bottom two.

---

### Step 86
Give the `.fb3a` element a `width` of `80%` and `height` of `15%`. Then give the `.fb3b` element a `width` of `100%` and `height` of `35%`.

---

### Step 87
Remove the `background-color` property and value from `.fb3`, and add them to `.fb3a` and `.fb3b`.

---

### Step 88
Add your `building-wrap` class to the `.fb3` element to center the sections.

---

### Step 89
Nest three new `div` elements in the first `.fb3a` element. Give them each a class of `fb3-window`. These will be windows for this section.

---

### Step 90
Give the `.fb3-window` elements a `width` of `25%`, a `height` of `80%`, and use your `--window-color1` variable as the `background-color` value.

---

### Step 91
Add your `window-wrap` class to the `.fb3a` element to center and space the windows.

---

### Step 92
With CSS variables you can change values without searching everywhere in the stylesheet. Change the `--window-color1` value to `#bb99ff`.

---

### Step 93
Only three more buildings to go. Nest two new `div` elements within the `.fb4` element and give them the classes of `fb4a` and `fb4b`, in that order. Remember that you sort of flipped the location of `.fb4` and `.fb5`, so it's the rightmost purple building you are working on now.

---

### Step 94
Give `.fb4b` a `width` of `100%` and `height` of `89%`.

---

### Step 95
Add your `--building-color1` variable as value of the `background-color` property of `.fb4b`. Then, remove the `background-color` from `.fb4`.

---

### Step 96
Nest six `div` elements within `.fb4b` and give them all a class of `fb4-window`.

---

### Step 97
Give the `.fb4-window` elements a `width` of `30%`, `height` of `10%`, and `border-radius` of `50%`. These will make some circular windows for this building.

---

### Step 98
Fill in the windows with your secondary color for this building. Also add a `margin` of `10%` to give the windows some space.

---

### Step 99
The windows are stacked on top of each other on the rightmost purple building. Turn the building into a flexbox parent, and use the `flex-wrap` property to put the windows side by side, and push them down to a new row when they don't fit.

---

### Step 100
This building is going to have another triangle on top. Give the top section a `border-top` of `5vh solid transparent`, and a `border-left` that is `8vw`, `solid`, and uses your building color variable as the color.

---

### Step 106
You can remove the `background-color` for this building now, since it isn't needed.

---

### Step 101
On to the next building! It's the green one in the foreground. Give it a `repeating-linear-gradient` with your building color from `0%` to `5%`, and `transparent` from `5%` to `10%`.

---

### Step 102
Add another `repeating-linear-gradient` below the one you just added. Give it a `90deg` direction, use your building color from `0%` to `12%` and window color `12%` to `44%`. This will make a bunch of rectangle windows.

---

### Step 104
Finally! You made it to the last building! Add a repeating gradient to it with a `90deg` direction. Use the building color from `0%` to `10%` and `transparent` from `10%` to `30%`.

---

### Step 105
Add another repeating gradient to this building; make it the same as the one you just added, except don't add the `90deg` direction and use your window color instead of the two `transparent` colors.

---

### Step 107
Okay, the buildings are done. Go back to the `*` selector and remove the `border` you applied to everything at the beginning and the buildings will come together.

---

### Step 108
Add `sky` as a second class to the `.background-buildings` element. You are going to make a background for the skyline.

---

### Step 109
Give the `sky` class a `radial-gradient`. Use `#ffcf33` from `0%` to `20%`, `#ffff66` at `21%`, and `#bbeeff` at `100%`. This will add circular gradient to the background that will be your sun.

---

### Step 110
At the top of the sky gradient color list, where you would put a direction for the gradient; add `circle closest-corner at 15% 15%,`. This will move the start of the gradient to `15%` from the top and left. It will make it end at the `closest-corner` and it will maintain a `circle` shape. These are some keywords built into gradients to describe how it behaves.

---

### Step 111
In the previous module you learned that media queries can be used to change styles based on certain conditions, and they look like this:

```css
@media (condition) {

}  
```

Add an empty media query at the bottom of your stylesheet with a condition of `max-width: 1000px`. Styles added in here will take effect when the document size is 1000px wide or less.

---

### Step 112
Copy and paste your whole `sky` class along with all of its properties and values into the media query. You are going to make another color scheme for the skyline that changes it from day to night.

Note: You are going to need to scroll past the editable region to copy the class.

---

### Step 113
In the `sky` class of the media query, change the two `#ffcf33` color values to `#ccc`, the `#ffff66` to `#445`, and the `#bbeeff` to `#223`. Then you can resize your window to see the background change colors.

---

### Step 114
Add a `:root` selector to the top of your media query. Then redefine all four of the `--building-color` variables to use the value `#000` there.

---

### Step 115
Lastly, in the `:root` selector of the media query, redefine all four of the `--window-color` variables to use `#777`. When you're done, resize the window and watch it go from day to night.

Variables are primarily used with colors, and that's how you used them here. But they can be given any value and used on any property. Your project looks great!

---

### Build an Availability Table
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a table with at least three columns and five rows, headers included.
1. Cells in the first row should be table headers containing days of the week.
1. Cells in the first column should be table headers with a `class` of `time` and should contain time values as their text.
1. All data cells should have the `class` of `available-#`, where `#` is a number from `0` to `5` that specifies the number of available people at that time.
1. In your `:root` selector, you should define six CSS variables named `--color#`, where `#` is a number from `0` to `5`, and assign them each a color value. Use these variables to set the background color of the corresponding `.available-#` elements.
1. In your `:root` selector, you should define CSS variables named `--solid-border` and `--dashed-border`. Use these variables to style the bottom borders of your data cells, alternating between solid and dashed borders depending on the row. Give the rows either the class of `sharp` or `half` to style them.
1. You should have a `div` element with the `id` of `legend`. It should contain a `span` element with the text `Availability` and a `div` element with the `id` of `legend-gradient`.
1. You should give the `#legend-gradient` element a linear gradient that transitions between all the colors from `--color0` to `--color5` with hard lines.

**Note:** Be sure to link your stylesheet in your HTML to apply your CSS.

---

### CSS Variables Review


---

### CSS Variables Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

Which of the following is NOT a valid descriptor in the `@property` rule?

#### --distractors--

`syntax`

---

`inherits`

---

`initial-value`

#### --answer--

`animation`

### --question--

#### --text--

In the following code, which value will `color` have if `--main-color` is not defined?

```css
p {
  color: var(--main-color, pink);
}
```

#### --distractors--

`Undefined`

---

No color will be applied.

---

`--main-color`

#### --answer--

`pink`

### --question--

#### --text--

Which of the following is a valid way to declare a custom property in CSS?

#### --distractors--

`$background-color: #333;`

---

`@property: #333`

---

`var(--background-color: #333);`

#### --answer--

`--background-color: #333;`

### --question--

#### --text--

What is the main purpose of using custom properties in CSS?

#### --distractors--

To change the DOM structure.

---

To create dynamic selectors.

---

To improve accessibility.

#### --answer--

To define reusable styles.

### --question--

#### --text--

What does the `:root` selector represent?

#### --distractors--

The first child element of the `body`.

---

The parent element of all `header` elements.

---

The first child of the `html` tag.

#### --answer--

The highest-level element in the DOM tree.

### --question--

#### --text--

How do you apply a `--foreground` custom property as the `color` in CSS?

#### --distractors--

`color: --foreground;`

---

`color: css(--foreground);`

---

`color: $foreground;`

#### --answer--

`color: var(--foreground);`

### --question--

#### --text--

What is the purpose of the `@property` rule in CSS?

#### --distractors--

To define a media query.

---

To control CSS animations and their timing.

---

To group CSS properties into one rule.

#### --answer--

To define how custom properties behave.

### --question--

#### --text--

When declaring a custom `@property`, what is the purpose of the `syntax` in its definition?

#### --distractors--

It specifies the default value of the custom property.

---

It determines whether the property can be inherited by child elements.

---

It defines whether the property is applied to all elements.

#### --answer--

It enforces a specific data type or value pattern for the custom property.

### --question--

#### --text--

What should you be cautious of when using custom properties?

#### --distractors--

Custom properties are automatically converted to `px` units.

---

Custom properties always override inline styles.

---

Custom properties cannot be used to set font values.

#### --answer--

Custom properties may not be supported in older browsers.

### --question--

#### --text--

What is the purpose of providing a fallback value in the `var()` function for CSS custom properties?

#### --distractors--

To reduce the amount of CSS code.

---

To improve performance in modern browsers.

---

To optimize rendering time on slow networks.

#### --answer--

To ensure a valid value is applied if the custom property is undefined.

### --question--

#### --text--

When defining a variable `--foreground` inside a media query, what happens when the media query no longer matches the current viewport?

#### --distractors--

The custom property is preserved and continues to apply.

---

The custom property reverts to its initial value.

---

The custom property is recalculated based on the viewport.

#### --answer--

The custom property is no longer available as it is scoped to the media query.

### --question--

#### --text--

How would the following declaration behave?

```css
color: var(--main-color, var(--fallback-color, #000));
```

#### --distractors--

It will apply `--main-color` even if it is not defined, defaulting to that value.

---

It will apply `--main-color` and `--fallback-color` simultaneously, resulting in a blend of the two colors.

---

It will always default to `#000`, regardless of whether `--main-color` or `--fallback-color` is defined.

#### --answer--

It applies `--main-color` if defined; otherwise, checks `--fallback-color;` and if both are undefined, it uses `#000`.

### --question--

#### --text--

What is one benefit of using `@property` in CSS?

#### --distractors--

It improves performance by precomputing custom property values.

---

It automatically prefixes custom properties for better browser support.

---

It restricts the use of custom properties to specific elements.

#### --answer--

It allows for animations of custom properties.

### --question--

#### --text--

What does the `inherits` property in a custom `@property` declaration control?

#### --distractors--

Whether the custom property will have an initial value.

---

Whether the property can have a shorthand version.

---

Whether the property accepts fallback values.

#### --answer--

Whether the custom property's value is passed to child elements.

### --question--

#### --text--

In the declaration of a custom `@property`, what does the `initial-value` specify?

#### --distractors--

The acceptable values the property can accept.

---

The priority of the property in the cascade.

---

The type of value the property must have.

#### --answer--

The fallback value for the property.

### --question--

#### --text--

Given the following HTML and CSS code, what will be the value of the `color` property for the `.box` element?

```html
<div class="container">
  <div class="box">Text</div>
</div>
```

```css
:root {
  --main-color: red;
}

.container {
  --main-color: blue;
}

.box {
  color: var(--main-color, black);
}
```

#### --distractors--

`black`

---

`red`

---

`green`

#### --answer--

`blue`

### --question--

#### --text--

Which property should a CSS gradient be applied to?

#### --distractors--

`color`

---

`border-radius`

---

`box-shadow`

#### --answer--

`background`

### --question--

#### --text--

What is the purpose of color stops in CSS gradients?

#### --distractors--

To define the transparency level of the gradient.

---

To specify the direction of the gradient.

---

To repeat the gradient in a fixed pattern.

#### --answer--

To define the specific points where colors change in the gradient.

### --question--

#### --text--

What happens if no angle or direction is specified in a CSS linear gradient?

#### --distractors--

The gradient defaults to a diagonal direction.

---

The gradient defaults to moving from bottom to top.

---

The gradient defaults to moving from left to right.

#### --answer--

The gradient defaults to moving from top to bottom.

### --question--

#### --text--

Which CSS gradient function allows you to create a gradient that radiates outward from a central point?

#### --distractors--

`linear-gradient()`

---

`conic-gradient()`

---

`repeating-linear-gradient()`

#### --answer--

`radial-gradient()`

## --quiz--

### --question--

#### --text--

Which of the following is a correct way to declare a CSS custom property?

#### --distractors--

`background-color: var(--blue);`

---

`custom-property: blue;`

---

`define --my-color: blue;`

#### --answer--

`--my-color: blue;`

### --question--

#### --text--

What selector is typically used to define global CSS custom properties?

#### --distractors--

`.global {}`

---

`* {}`

---

`body {}`

#### --answer--

`:root {}`

### --question--

#### --text--

When using `var()`, why is it recommended to include a fallback value?

#### --distractors--

It ensures the variable will animate correctly.

---

It avoids loading external stylesheets.

---

It prevents browser reflow.

#### --answer--

It guarantees a valid value if the custom property is undefined.

### --question--

#### --text--

What is the correct syntax to apply a custom property as a background color?

#### --distractors--

`background: get(--main-bg);`

---

`background: css(--main-bg);`

---

`background: --main-bg;`

#### --answer--

`background: var(--main-bg);`

### --question--

#### --text--

Which CSS rule allows developers to define custom properties with greater control over their behavior?

#### --distractors--

`@media`

---

`@keyframes`

---

`@supports`

#### --answer--

`@property`

### --question--

#### --text--

What does the `inherits` field in an `@property` definition control?

#### --distractors--

Whether the property is used in JavaScript.

---

Whether the property will trigger repaints.

---

Whether the property can contain functions.

#### --answer--

Whether the property's value is passed to child elements.

### --question--

#### --text--

When defining an animated gradient angle using `@property`, which syntax should be used?

#### --distractors--

`"<number>"`

---

`"<color>"`

---

`"<string>"`

#### --answer--

`"<angle>"`

### --question--

#### --text--

What distinguishes a CSS custom property from a standard CSS property in terms of how it's defined?

#### --distractors--

Standard CSS properties are defined with a single dash, while custom properties use two dashes.

---

Standard CSS properties use `var()` for definition, while custom properties do not.

---

Standard CSS properties are defined using the `@property` rule, while custom properties are not.

#### --answer--

Custom properties must start with two dashes (`--`), while standard CSS properties do not.

### --question--

#### --text--

Which of these is a benefit of using CSS custom properties?

#### --distractors--

They reduce the need for CSS comments.

---

They automatically optimize images.

---

They make JavaScript variables obsolete.

#### --answer--

They allow styles to be reused and centrally maintained.

### --question--

#### --text--

Which CSS property can change dynamically based on media queries using custom properties?

#### --distractors--

Only `background-color`

---

Only `font-family`

---

Only `z-index`

#### --answer--

Any property that accepts a value.

### --question--

#### --text--

In the context of CSS variables, what is the role of `initial-value` in an `@property` rule?

#### --distractors--

It sets the minimum value of the property.

---

It defines the maximum value for animations.

---

It changes the selector priority.

#### --answer--

It assigns a default value for the property if none is set.

### --question--

#### --text--

Consider the following HTML and CSS. What background color will be applied to the `.card` element?

```html
<div class="dark-theme">
  <div class="card">Content</div>
</div>
```

```css
:root {
  --bg-color: white;
}

.dark-theme {
  --bg-color: #333;
}

.card {
  background: var(--bg-color);
}
```

#### --distractors--

`white`

---

`transparent`

---

`inherit`

#### --answer--

`#333`

### --question--

#### --text--

In the following CSS, what happens if a user tries to assign an invalid value to `--padding` (for example, a color instead of a length)?

```css
@property --padding {
  syntax: "<length>";
  initial-value: 0px;
  inherits: false;
}
```

#### --distractors--

The browser accepts the value but ignores it during layout.

---

The browser throws a runtime error.

---

The browser converts the value to a valid length automatically.

#### --answer--

The browser falls back to the property's initial value.

### --question--

#### --text--

What is the purpose of the `--gradient-angle` custom property in this example?

```css
@property --gradient-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.gradient {
  width: 100px;
  height: 100px;
  background: linear-gradient(var(--gradient-angle), red, blue);
  transition: --gradient-angle 0.5s;
}

.gradient:hover {
  --gradient-angle: 90deg;
}
```

#### --distractors--

It defines the speed of the gradient transition.

---

It specifies the size of the gradient.

---

It sets the color blending mode.

#### --answer--

It controls the direction of the gradient.

### --question--

#### --text--

Which scenario best shows the advantage of using custom properties for themes?

#### --distractors--

Using them just for font sizes.

---

Applying them only on `:hover`.

---

Restricting them to one CSS class.

#### --answer--

Changing values via class.

### --question--

#### --text--

Why might developers prefer using `:root` for defining CSS variables?

#### --distractors--

Because `:root` improves page load speed.

---

Because `:root` disables specificity.

---

Because `:root` is required for JavaScript.

#### --answer--

Because `:root` allows the properties to be globally scoped.

### --question--

#### --text--

What would the following CSS do if `--secondary-color` is undefined?

```css
h1 {
  color: var(--secondary-color, orange);
}
```

#### --distractors--

It will apply `black`.

---

It will ignore the `color` property.

---

It will apply `--secondary-color`.

#### --answer--

It will apply `orange`.

### --question--

#### --text--

What type of values does `<color>` represent in an `@property` syntax field?

#### --distractors--

Angles like `90deg`.

---

Lengths like `10px`.

---

Percentages like `50%`.

#### --answer--

Color values like `#ff0000` or `red`.

### --question--

#### --text--

What is the main benefit of using custom properties in combination with `@property`?

#### --distractors--

They prevent needing fallback values.

---

They force static layout.

---

They reduce the need for classes.

#### --answer--

They allow property animation.

### --question--

#### --text--

What does `var(--undefined-property, fallback)` do when the custom property is not defined?

#### --distractors--

Throws an error and stops applying styles.

---

Ignores the entire CSS rule.

---

Applies the variable name as is.

#### --answer--

Applies the fallback value instead.

---

## css-grid

### What Is CSS Grid, and How Does It Differ from Flexbox?


---

### How Can You Create Flexible Grids with the fr Unit?


---

### How Can You Create Gaps Between Tracks in a Grid?


---

### How Can You Repeat Track Listings in a Grid Layout?


---

### What Is the Difference Between an Implicit and Explicit Grid?


---

### What Is the minmax() Function and How Does It Work?


---

### How Do the grid-column and grid-row Properties Work?


---

### How Can You Position Items on the Grid Using the grid-template-areas Property?


---

### Step 1
In this workshop, you will create a magazine page using a press release from a previous version of freeCodeCamp's curriculum.

Begin with adding a `link` element for the `https://fonts.googleapis.com/css?family=Anton%7CBaskervville%7CRaleway&display=swap` font stylesheet, a `link` for the `https://use.fontawesome.com/releases/v5.8.2/css/all.css` FontAwesome stylesheet, and a `link` for your `./styles.css` stylesheet.

Your font stylesheet will load three separate fonts: `Anton`, `Baskervville`, and `Raleway`.

---

### Step 2
Within your `body`, create a `main` element. Then in that element, create a `section` with a `class` set to `heading`.

---

### Step 3
Within your `.heading` element, create a `header` element with the `class` set to `hero`.

In that element, create an `img` element with the `src` set to `https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png`, the `alt` set to `freecodecamp logo`, and the `class` set to `hero-img`.

The `loading` attribute on an `img` element can be set to `lazy` to tell the browser not to fetch the image resource until it is needed (as in, when the user scrolls the image into view). As an additional benefit, lazy loaded elements will not load until the non-lazy elements are loaded - this means users with slow internet connections can view the content of your page without having to wait for the images to load.

Give your new `img` element a `loading` attribute set to `lazy`.

---

### Step 6
After your `header` element, create a `div` with the `class` set to `author`.

Within that `div`, create a `p` element with the `class` set to `author-name` and give it the text `By freeCodeCamp`. Wrap the `freeCodeCamp` portion in an `a` element with the `href` set to `https://freecodecamp.org`, and the `target` set to `_blank`.

Below that, add a second `p` element with the class `publish-date` and the text `March 7, 2019`.

---

### Step 8
Below your `.author` element, create a new `div` element with the class `social-icons`.

Add five `a` elements within that new `div`, and give them the following `href` attributes.

- The first `a` element should have an `href` set to `https://www.facebook.com/freecodecamp`.
- The second `a` element should have an `href` set to `https://twitter.com/freecodecamp`.
- The third `a` element should have an `href` set to `https://instagram.com/freecodecamp`.
- The fourth `a` element should have an `href` set to `https://www.linkedin.com/school/free-code-camp`.
- The fifth `a` element should have an `href` set to `https://www.youtube.com/freecodecamp`.

---

### Step 9
Within each of your new `a` elements, add an `i` element and give them the following classes:

- Your first `i` element should have the class `fab fa-facebook-f`
- Your second `i` element should have the class `fab fa-twitter`
- Your third `i` element should have the class `fab fa-instagram`
- Your fourth `i` element should have the class `fab fa-linkedin-in`
- Your fifth `i` element should have the class `fab fa-youtube`

---

### Step 10
Below your `.heading` element, create a new `section` element with the `class` set to `text`. Within that, create a `p` element with the `class` set to `first-paragraph` and the following text:

```markup
Soon the freeCodeCamp curriculum will be 100% project-driven learning. Instead of a series of coding challenges, you'll learn through building projects - step by step. Before we get into the details, let me emphasize: we are not changing the certifications. All 6 certifications will still have the same 5 required projects. We are only changing the optional coding challenges.
```

---

### Step 11
Create another `p` element below your `.first-paragraph` element, and give it the following text:

```markup
After years - years - of pondering these two problems and how to solve them, I slipped, hit my head on the sink, and when I came to I had a revelation! A vision! A picture in my head! A picture of this! This is what makes time travel possible: the flux capacitor!
```

---

### Step 12
Add a third `p` element at the end of your `.text` element, and give it the following text:

```markup
It wasn't as dramatic as Doc's revelation in Back to the Future. It just occurred to me while I was going for a run. The revelation: the entire curriculum should be a series of projects. Instead of individual coding challenges, we'll just have projects, each with their own seamless series of tests. Each test gives you just enough information to figure out how to get it to pass. (And you can view hints if that isn't enough.)
```

---

### Step 13
After the three `p` elements within your `.text` element, create a `blockquote` element. Within that, add an `hr` element, a `p` element with the `class` set to `quote`, and a second `hr` element.

Give the `.quote` element the text `The entire curriculum should be a series of projects`.

---

### Step 14
Below your `blockquote` element, add another `p` element with the following text:

```markup
No more walls of explanatory text. No more walls of tests. Just one test at a time, as you build up a working project. Over the course of passing thousands of tests, you build up projects and your own understanding of coding fundamentals. There is no transition between lessons and projects, because the lessons themselves are baked into projects. And there's plenty of repetition to help you retain everything because - hey - building projects in real life has plenty of repetition.
```

---

### Step 15
Create a fifth `p` element at the end of your `.text` element, and give it the following text:

```markup
The main design challenge is taking what is currently paragraphs of explanation and instructions and packing them into a single test description text. Each project will involve dozens of tests like this. People will be coding the entire time, rather than switching back and forth from "reading mode" to "coding mode".
```

---

### Step 16
Create one final `p` element at the end of your `.text` element and give it the following text:

```markup
Instead of a series of coding challenges, people will be in their code editor passing one test after another, quickly building up a project. People will get into a real flow state, similar to what they experience when they build the required projects at the end of each certification. They'll get that sense of forward progress right from the beginning. And freeCodeCamp will be a much smoother experience.
```

---

### Step 17
Below your `.text` element, create a new `section` element and give it a `class` of `text text-with-images`. Within that, create an `article` element with a `class` set to `brief-history`, and an `aside` element with the `class` set to `image-wrapper`.

---

### Step 18
Within your `article` element, create an `h3` element with the `class` set to `list-title` and the text of `A Brief History`. Below that, create a `p` element with the text `Of the Curriculum`. Then create a `ul` element with the class `lists`.

---

### Step 19
Within your `ul` element, create six `li` elements. Add an `h4` element with a `class` set to `list-subtitle` and a `p` element to each of your `li` elements.

Then give the `h4` and `p` elements the following text content, in order, with each `h4` using what's on the left side of the colon, and each `p` using what's on the right:

- `V1 - 2014`: `We launched freeCodeCamp with a simple list of 15 resources, including Harvard's CS50 and Stanford's Database Class.`
- `V2 - 2015`: `We added interactive algorithm challenges.`
- `V3 - 2015`: `We added our own HTML+CSS challenges (before we'd been relying on General Assembly's Dash course for these).`
- `V4 - 2016`: `We expanded the curriculum to 3 certifications, including Front-End, Back-End, and Data Visualization. They each had 10 required projects, but only the Front-End section had its own challenges. For the other certs, we were still using external resources like Node School.`
- `V5 - 2017`: `We added the back-end and data visualization challenges.`
- `V6 - 2018`: `We launched 6 new certifications to replace our old ones. This was the biggest curriculum improvement to date.`

---

### Step 20
Within your `aside` element, create two `img` elements, a `blockquote` element, and a third `img` element. Give the `blockquote` element a `class` set to `image-quote`.

---

### Step 21
Within the `.image-wrapper` element, give your first `img` element a `src` of `https://cdn.freecodecamp.org/testable-projects-fcc/images/random-quote-machine.png`, an `alt` of `image of the quote machine project`, a `class` of `image-1`, a `loading` attribute set to `lazy`, a `width` attribute of `600`, and a `height` attribute of `400`.

---

### Step 22
Within your `.image-wrapper` element, give the second `img` element a `src` of `https://cdn.freecodecamp.org/testable-projects-fcc/images/calc.png`, an `alt` of `image of a calculator project`, a `loading` attribute set to `lazy`, a `class` set to `image-2`, a `width` attribute set to `400`, and a `height` attribute set to `400`.

---

### Step 23
Within your `.image-wrapper` element, give your third `img` element a `src` of `https://cdn.freecodecamp.org/testable-projects-fcc/images/survey-form-background.jpeg`, an `alt` of `four people working on code`, a `loading` attribute of `lazy`, a `class` set to `image-3`, a `width` attribute set to `600`, and a `height` attribute set to `400`.

---

### Step 24
Within your `.image-quote` element, nest an `hr` element, a `p` element and a second `hr` element. Give the `p` element a `class` set to `quote` and the text `The millions of people who are learning to code through freeCodeCamp will have an even better resource to help them learn these fundamentals.`.

---

### Step 25
To start your CSS, normalize the CSS rules by targeting all elements with `*`, including the `::before` and `::after` pseudo-selectors.

Set the `padding` and `margin` properties both to `0` and set the `box-sizing` property to `border-box`.

---

### Step 26
Create an `html` selector and give it a `font-size` property set to `62.5%`. This will set the default font size for your web page to 10px (the browser default is 16px).

This will make it easier for you to work with `rem` units later, as `2rem` would be 20px.

---

### Step 27
Create a `body` selector. Set the `font-family` property to `Baskervville`, with a fallback of `serif`. Set the `color` property to `linen` and the `background-color` property to `rgb(20, 30, 40)`.

---

### Step 28
Create an `h1` selector, and set the `font-family` property to `Anton` with the fallback of `sans-serif`.

---

### Step 29
Create an `h2, h3, h4, h5, h6` selector. Give it a `font-family` property set to `Raleway` with a fallback of `sans-serif`.

---

### Step 30
Create an `a` selector, and give it a `text-decoration` property set to `none` and a `color` property set to `linen`.

---

### Step 31
Now you are ready to start putting together the grid layout. In previous lessons you learned that CSS Grid offers a two-dimensional grid-based layout, allowing you to center items horizontally and vertically while still retaining control to do things like overlap elements.

Begin by creating a `main` selector and giving it a `display` property set to `grid`.

---

### Step 32
Now you can style the layout of your grid. CSS Grid is similar to Flexbox in that it has a special property for both the parent and child elements. 

In this case, your parent element is the `main` element. Set the content to have a three-column layout by adding a `grid-template-columns` property with a value of `1fr 94rem 1fr`. This will create three columns where the middle column is `94rem` wide, and the first and last columns are both 1 fraction of the remaining space in the grid container.

---

### Step 33
Use the `minmax` function to make your columns responsive on any device. The `minmax` function takes two arguments, the first being the minimum value and the second being the maximum. These values could be a length, percentage, `fr`, or even a keyword like `max-content`.

Wrap each of your already defined values of the `grid-template-columns` property in a `minmax` function, using each value as the second argument. The first argument should be `2rem`, `min-content`, and `2rem` respectively.

---

### Step 34
To add space between rows in the grid layout, you can use the `row-gap` property. Give the `main` selector a `row-gap` property of `3rem`.

---

### Step 35
Your magazine will have three primary sections. You already set the overall layout in the `main` rule, but you can adjust the placement in the child rules.

One option is the `grid-column` property, which is shorthand for `grid-column-start` and `grid-column-end`. The `grid-column` property tells the grid item which grid line to start and end at.

Create a `.heading` rule and set the `grid-column` property to `2 / 3`. This will tell the `.heading` element to start at grid line 2 and end at grid line 3.

---

### Step 36
Create a `.text` selector and give it a `grid-column` property set to `2 / 3`.

---

### Step 37
For additional control over the layout of your content, you can have a CSS Grid within a CSS Grid.

Set the `display` property of your `.heading` selector to `grid`.

---

### Step 38
Now you can style the content of the `.heading` element with CSS Grid.

The CSS `repeat()` function is used to repeat a value, rather than writing it out manually, and is helpful for grid layouts. For example, setting the `grid-template-columns` property to `repeat(20, 200px)` would create 20 columns each `200px` wide.

Give your `.heading` element a `grid-template-columns` property set to `repeat(2, 1fr)` to create two columns of equal width.

---

### Step 39
Give your `.heading` selector a `row-gap` property set to `1.5rem`.

---

### Step 40
Remember that the `grid-column` property determines which columns an element starts and ends at. There may be times where you are unsure of how many columns your grid will have, but you want an element to stop at the last column. To do this, you can use `-1` for the end column.

Create a `.hero` selector and give it a `grid-column` property set to `1 / -1`. This will tell the element to span the full width of the grid.

---

### Step 41
Give the `.hero` selector a `position` property set to `relative`.

---

### Step 43
Create an `img` selector and give it a `width` property set to `100%`, and an `object-fit` property set to `cover`.

The `object-fit` property tells the browser how to position the element within its container. In this case, `cover` will set the image to fill the container, cropping as needed to avoid changing the aspect ratio.

---

### Step 44
Create a `.hero-title` selector and give it a `text-align` property set to `center`, a `color` property set to `orangered` and a `font-size` property set to `8rem`.

---

### Step 45
The subtitle also needs to be styled. Create a `.hero-subtitle` selector and give it a `font-size` property set to `2.4rem`, a `color` property set to `orangered`, and a `text-align` property set to `center`.

---

### Step 46
Create an `.author` selector and give it a `font-size` property set to `2rem` and a `font-family` property set to `Raleway` with a fallback of `sans-serif`.

---

### Step 47
Create a `.author-name a:hover` selector and give it a `background-color` property set to `#306203`.

This will create a hover effect only for the `a` element within the `.author-name`, showing the original freeCodeCamp green in the background.

---

### Step 48
Create a `.publish-date` selector and give it a `color` property of `rgba(255, 255, 255, 0.5)`.

---

### Step 49
Create a `.social-icons` selector. Give it a `display` property set to `grid`, and a `font-size` property set to `3rem`.

---

### Step 50
The default settings for CSS Grid will create additional rows as needed, unlike Flexbox. Give the `.social-icons` selector a `grid-template-columns` property set to `repeat(5, 1fr)` to arrange the icons in a single row.

---

### Step 51
If you wanted to add more social icons, but keep them on the same row, you would need to update `grid-template-columns` to create additional columns. As an alternative, you can use the `grid-auto-flow` property.

This property takes either `row` or `column` as the first value, with an optional second value of `dense`. `grid-auto-flow` uses an auto-placement algorithm to adjust the grid layout. Setting it to `column` will tell the algorithm to create new columns for content as needed. The `dense` value allows the algorithm to backtrack and fill holes in the grid with smaller items, which can result in items appearing out of order.

For your `.social-icons` selector, set the `grid-auto-flow` property to `column`.

---

### Step 52
Now the auto-placement algorithm will kick in when you add a new icon element. However, the algorithm defaults the new column width to be `auto`, which will not match your current columns.

You can override this with the `grid-auto-columns` property. Give the `.social-icons` selector a `grid-auto-columns` property set to `1fr`.

---

### Step 53
Much like Flexbox, with CSS Grid you can align the content of grid items with `align-items` and `justify-items`. `align-items` will align child elements along the column axis, and `justify-items` will align child elements along the row axis.

Give the `.social-icons` selector an `align-items` property set to `center`.

---

### Step 54
Give the `.text` selector a `font-size` property set to `1.8rem` and a `letter-spacing` property set to `0.6px`.

---

### Step 55
Your `.text` element is not a CSS Grid, but you can create columns within an element without using Grid by using the `column-width` property.

Give your `.text` selector a `column-width` property set to `25rem`.

---

### Step 56
Magazines often use justified text in their printed content to structure their layout and control the flow of their content. While this works in printed form, justified text on websites can be an accessibility concern, for example presenting challenges for folks with dyslexia.

To make your project look like a printed magazine, give the `.text` selector a `text-align` property set to `justify`.

---

### Step 57
The `::first-letter` pseudo-selector allows you to target the first letter in the text content of an element.

Create a `.first-paragraph::first-letter` selector and set the `font-size` property to `6rem`. Also give it a `color` property set to `orangered` to make it stand out.

---

### Step 58
The other text has been shifted out of place. Move it into position by giving the `.first-paragraph::first-letter` selector a `float` property set to `left` and a `margin-right` property set to `1rem`.

---

### Step 59
Create an `hr` selector, and give it a `margin` property set to `1.5rem 0`.

---

### Step 60
To give the `hr` a color, you need to adjust the `border` property. Give the `hr` selector a `border` property set to `1px solid rgba(120, 120, 120, 0.6)`.

---

### Step 61
Create a `.quote` selector. Give it a `color` property set to `#00beef`, a `font-size` property set to `2.4rem`, and a `text-align` property set to `center`.

---

### Step 62
To make the quote text stand out more, give the `.quote` selector a `font-family` property set to `Raleway` with a fallback of `sans-serif`.

---

### Step 63
A quote is not really a quote without proper quotation marks. You can add these with CSS pseudo selectors.

Create a `.quote::before` selector and set the `content` property to `"` with a space following it.

Also, create a `.quote::after` selector and set the `content` property to `"` with a space preceding it.

---

### Step 64
Now it's time to style your third `section`. Note that it has the `text` and `text-with-images` values for the `class` attribute, which means it is already inheriting the styles from your `.text` rule.

Create a `.text-with-images` selector and set the `display` property to `grid`.

---

### Step 65
You will need to have a column for text and a column for images. Give the `.text-with-images` selector a `grid-template-columns` property set to `1fr 2fr`. Also set the `column-gap` property to `3rem` to provide more spacing between the columns.

---

### Step 66
Give the `.text-with-images` selector a `margin-bottom` property set to `3rem`.

---

### Step 67
Create a `.lists` selector and set the `list-style-type` property to `none`. This will get rid of the bullet points on the list items.

---

### Step 68
Give the `.lists` selector a `margin-top` property set to `2rem`.

---

### Step 69
Create a `.lists li` rule to target the list items within your `.lists` element. Give it a `margin-bottom` property set to `1.5rem`.

---

### Step 70
Create a `.list-title, .list-subtitle` selector and set the `color` property to `#00beef`.

---

### Step 71
Time to style the last section of the magazine - the images.

The images are wrapped with an `aside` element using the `image-wrapper` class, so create an `.image-wrapper` selector. Set the `display` property to `grid`.

---

### Step 72
The images should be within a two column, three row layout.

Give the `.image-wrapper` selector a `grid-template-columns` property set to `2fr 1fr` and a `grid-template-rows` property set to `repeat(3, min-content)`. This will give our grid rows that adjust in height based on the content, but columns that remain a fixed width based on the container.

---

### Step 73
The `gap` property is a shorthand way to set the value of `column-gap` and `row-gap` at the same time. If given one value, it sets the `column-gap` and `row-gap` both to that value. If given two values, it sets the `row-gap` to the first value and the `column-gap` to the second.

Give the `.image-wrapper` selector a `gap` property set to `2rem`.

---

### Step 74
The `place-items` property can be used to set the `align-items` and `justify-items` values at the same time. The `place-items` property takes one or two values. If one value is provided, it is used for both the `align-items` and `justify-items` properties. If two values are provided, the first value is used for the `align-items` property and the second value is used for the `justify-items` property.

Give the `.image-wrapper` selector a `place-items` property set to `center`.

---

### Step 75
Create an `.image-1, .image-3` rule and give it a `grid-column` property set to `1 / -1`. This will allow the first and third images to span the full width of the grid.

---

### Step 76
Now that the magazine layout is finished, you need to make it responsive.

Start with a `@media` query for `only screen` with a `max-width` of `720px`. Inside, create an `.image-wrapper` selector and give it a `grid-template-columns` property of `1fr`.

This will collapse the three images into one column on smaller screens.

---

### Step 77
Create another `@media` query for `only screen` with a `max-width` of `600px`. Within, create a `.text-with-images` rule and give it a `grid-template-columns` property of `1fr`.

This will collapse your bottom text area into a single column on smaller screens.

---

### Step 78
Create a third `@media` query for `only screen` with a `max-width` of `550px`. Within, create a `.hero-title` selector with a `font-size` set to `6rem`, a `.hero-subtitle, .author, .quote, .list-title` selector with a `font-size` set to `1.8rem`, a `.social-icons` selector with a `font-size` set to `2rem`, and a `.text` selector with a `font-size` set to `1.6rem`.

---

### Step 79
Create one final `@media` query for `only screen` with a `max-width` of `420px`. Within, create a `.hero-title` selector with a `font-size` property set to `4.5rem`.

Congratulations! Your magazine is now complete.

---

### Step 42
You should remove the temporary `width` attribute before writing the CSS for your `.hero-img`.

---

### Step 5
Your image currently takes up a lot of space. To better see what you are working on, add a `width` attribute to the `img` element, with a value of `400`.

You will remove this later on when you have worked on the CSS.

---

### Step 4
After your `img` element, add an `h1` element with the `class` set to `hero-title` and the text set to `OUR NEW CURRICULUM`, followed by a `p` element with the `class` set to `hero-subtitle` and the text set to `Our efforts to restructure our curriculum with a more project-based focus`.

---

### Step 7
The `Referer` HTTP header contains information about the address or URL of a page that a user might be visiting from. This information can be used in analytics to track how many users from your page visit freecodecamp.org, for example. Setting the `rel` attribute to `noreferrer` omits this information from the HTTP request. Give your `a` element a `rel` attribute set to `noreferrer`.

---

### Design a Newspaper Layout
In this lab, you will design a newspaper layout using CSS Grid, including concepts like grid rows and grid columns.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab. 

**User Stories:**

1. Your page should contain a `main` element with the class `newspaper-layout`.
1. The `.newspaper-layout` should include a `header` with the class `title` containing an `h1` to display the newspaper's name.
1. The `.newspaper-layout` should include an `article` with the class `feature-article` for the main news article.
1. The `.feature-article` should include an `h2` element for the article title followed by a `p` element for the article content.
1. You should add three more `article` elements for smaller articles, with classes `small-article1`, `small-article2`, and `small-article3`.
1. Each of the smaller articles should include an `h3` element for the article title followed by a `p` element for the article content.
1. The `.newspaper-layout` should include an `article` element with the class `secondary-article` for an additional news section.
1. The `.secondary-article` should include an `h2` element for the article title followed by a `p` element for the article content.
1. The `.newspaper-layout` should include a `figure` with the class `cover-image` to display an image that represents the newspaper's content.
1. The elements with the classes `title`, `feature-article`, `secondary-article`, `cover-image`, `small-article1`, `small-article2`, and `small-article3` should have a `grid-area` property set to the same class name.
1. Your `.newspaper-layout` should use CSS Grid with a `grid-template-areas` property to define the arrangement of sections:
   - The `.title` should span across the top row.
   - The `.feature-article` should span two columns in the second row, with the `.cover-image` in the third column.
   - The `.secondary-article` should span two columns in the third row, with the `.cover-image` in the third column.
   - The three small articles should appear in the fourth row.
1. The `.newspaper-layout` should have a `grid-template-columns` property that divides the space into three equal columns.
1. You should set the `.newspaper-layout`'s `grid-template-rows` property to `auto` for the first row and divide the remaining space into equal parts for the other rows.
1. You should add a gap between grid items.
1. Ensure that the image inside `.cover-image` fits within the designated space by setting its `max-width` to `100%`.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### How Can You Use the DevTools Inspection Tool and CSS Validators to Debug Your CSS?
Developer tools, inspection tools, and CSS validators are essential resources for debugging CSS issues and ensuring your stylesheets are error-free and optimized.

These tools provide invaluable insights into how your CSS is being applied and can help identify potential problems.

Let's start with browser developer tools, commonly known as DevTools. Most modern browsers, including Chrome, Firefox, and Safari, come with built-in DevTools. To access them, you can right-click on an element on your webpage and select "Inspect" or use keyboard shortcuts like `F12` or `Cmd+Option+I` (on macOS).

DevTools allow you to inspect and modify your CSS in real-time. The Styles pane shows all the CSS rules applied to the selected element, including inherited styles.

You can toggle individual properties on and off, edit values, and even add new rules directly in the browser. This immediate feedback is incredibly useful for experimenting with different styles without modifying your source code.

The inspection tool, which is part of DevTools, allows you to hover over elements on your page and see their box model, including margins, borders, padding, and content area. This is particularly useful for diagnosing layout issues or understanding why elements are positioned in a certain way.

CSS validators are another important tool for debugging. The W3C CSS Validator is a popular choice. It checks your CSS against the official specifications and reports any errors or warnings. To use it, you can either upload your CSS file, input your CSS directly, or provide a URL to validate.

For example, let's say you are working with the following CSS:

```css
.container {
  width: 100%;
  height: 200px
  background-color: #F0F0F0;
}
```

The validator would point out that there's a missing semicolon after the `height` property. This kind of error can be easy to overlook but can cause significant issues in your stylesheet.

When debugging responsive designs, the device emulation feature in DevTools is invaluable. It allows you to simulate how your site looks on various screen sizes and devices. This can help you identify breakpoint issues or styles that don't scale well across different viewport sizes.

Remember, effective CSS debugging often involves a combination of these tools. You might start by using a validator to catch any syntax errors, then use DevTools to inspect specific elements and experiment with changes. The device emulation tool can then help ensure your styles work across different screen sizes.

By mastering these tools, you can significantly speed up your CSS debugging process and create more robust, error-free stylesheets.

Regular use of these debugging techniques will not only help you solve immediate issues but also improve your overall understanding of CSS and how it interacts with your HTML.

# --questions--

## --text--

What is a primary advantage of using browser DevTools for CSS debugging?

## --answers--

It automatically fixes all CSS errors.

### --feedback--

Think about the immediate feedback DevTools provides when working with styles.

---

It allows real-time inspection and modification of CSS.

---

It compresses your CSS files.

### --feedback--

Think about the immediate feedback DevTools provides when working with styles.

---

It generates new CSS rules for you.

### --feedback--

Think about the immediate feedback DevTools provides when working with styles.

## --video-solution--

2

## --text--

Which of the following is NOT a typical feature of CSS validators?

## --answers--

Checking CSS against official specifications.

### --feedback--

Consider what CSS validators are primarily designed to do.

---

Reporting syntax errors.

### --feedback--

Consider what CSS validators are primarily designed to do.

---

Providing suggestions for improving CSS performance.

---

Identifying missing semicolons.

### --feedback--

Consider what CSS validators are primarily designed to do.

## --video-solution--

3

## --text--

How can the device emulation feature in DevTools assist in CSS debugging?

## --answers--

It automatically adjusts your CSS for all devices.

### --feedback--

Think about the challenges of responsive design and how this feature might help.

---

It shows how your site looks on various screen sizes and devices.

---

It creates separate CSS files for each device.

### --feedback--

Think about the challenges of responsive design and how this feature might help.

---

It optimizes images for mobile devices.

### --feedback--

Think about the challenges of responsive design and how this feature might help.

## --video-solution--

2

---

### CSS Grid Review


---

### CSS Grid Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What is CSS Grid?

#### --distractors--

A method used for displaying tables on a website.

---

A method used for tiling images.

---

A way to display outlines around HTML elements.

#### --answer--

A two-dimensional layout for HTML documents.

### --question--

#### --text--

Which of the following is the correct way to create a grid container?

#### --distractors--

`display: grid-area;`

---

`grid: grid-template;`

---

`grid-template: set;`

#### --answer--

`display: grid;`

### --question--

#### --text--

What does the `grid-template-columns` property do?

#### --distractors--

Defines two columns and three rows for a grid container.

---

Sets all columns for the grid layout to a fixed length.

---

Creates a two column grid layout container.

#### --answer--

Defines the number of columns in a grid layout.

### --question--

#### --text--

What does the `grid-template-rows` property do?

#### --distractors--

Specifies a grid item's size and location in a grid layout.

---

Creates a template for creating new grid rows.

---

Specifies a default row size in the grid container.

#### --answer--

Specifies the number and height for each row in a grid layout.

### --question--

#### --text--

What does the `minmax()` function do?

#### --distractors--

Toggles between the first and second value, depending on available space.

---

Returns the average of the two inputs.

---

Sets the minimal size of the element for browser working in full-screen mode.

#### --answer--

Sets the minimum and maximum sizes for a track.

### --question--

#### --text--

What is the shorthand for the `column-gap` and `row-gap` properties?

#### --distractors--

`gap-column-row`

---

`gutters`

---

`grid-gap`

#### --answer--

`gap`

### --question--

#### --text--

What is the difference between an implicit and explicit grid?

#### --distractors--

Implicit grids use the `grid-template-columns` property while explicit grids use the `grid-template-rows` property.

---

Explicit grids use the `grid-template-columns` property while implicit grids use the `grid-template-rows` property.

---

Implicit grids use the `grid-template-columns` or `grid-template-rows` properties to create columns while rows and columns are automatically created in explicit grids.

#### --answer--

Explicit grids use the `grid-template-columns` or `grid-template-rows` properties to create columns while rows and columns are automatically created in implicit grids.

### --question--

#### --text--

Which of the following units represents a fraction of the space within the grid container?

#### --distractors--

`fractional`

---

`frac`

---

`f`

#### --answer--

`fr`

### --question--

#### --text--

What are grid lines?

#### --distractors--

Shorthand for rows and columns.

---

Outlines of a grid element.

---

Lines along which grid columns and rows are created.

#### --answer--

Lines on which each of the grid items begin and end.

### --question--

#### --text--

What does the `grid-column` property do?

#### --distractors--

Adds a new grid element as a child of the element it's applied to.

---

Aligns text in the grid item vertically.

---

Sets two columns for a grid container.

#### --answer--

Tells the grid item on which grid line it should start and end at.

### --question--

#### --text--

How do you create four columns of equal width?

#### --distractors--

`grid-template-columns: repeat(4);`

---

`grid-template-columns: repeat(1, 4);`

---

`grid-template-columns: repeat(1fr, 4);`

#### --answer--

`grid-template-columns: repeat(4, 1fr);`

### --question--

#### --text--

What does the `grid-template-areas` property do?

#### --distractors--

It is used to specify where the item begins on a line in the grid container.

---

It is used to create gaps between tracks in the container.

---

It is used to repeat sections in the track listing. 

#### --answer--

It is used to provide a name for the items you are going to position on the grid.

### --question--

#### --text--

What does the `grid-auto-flow` property do?

#### --distractors--

Controls the order in which grid items are displayed.

---

Adjusts the spacing between the grid elements.

---

Automatically adjusts the element to fit in the grid.

#### --answer--

Controls how auto-placed elements get inserted to the grid.

### --question--

#### --text--

Which of the following is the correct way to use the `grid-template-areas` property?

#### --distractors--

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr; 
  grid-template-rows: auto 1fr auto; 
  grid-template-areas: set(
    "header header"
    "sidebar main"
    "footer footer" 
  );
  gap: 20px; 
}
```

---

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr; 
  grid-template-rows: auto 1fr auto; 
  grid-template-areas: apply(
    "header header"
    "sidebar main"
    "footer footer" 
  );
  gap: 20px; 
}
```

---

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr; 
  grid-template-rows: auto 1fr auto; 
  grid-template-areas: set-areas;
  gap: 20px; 
}
```

#### --answer--

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr; 
  grid-template-rows: auto 1fr auto; 
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer"; 
  gap: 20px; 
}
```

### --question--

#### --text--

Which of the following is the correct way to work with the `grid-auto-flow` property?

#### --distractors--

```css
.social-icons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: none;
  grid-auto-columns: 1fr;
}
```

---

```css
.social-icons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: allow;
  grid-auto-columns: 1fr;
}
```

---

```css
.social-icons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: set;
  grid-auto-columns: 1fr;
}
```

#### --answer--

```css
.social-icons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
}
```

### --question--

#### --text--

Which of the following is NOT a valid grid property?

#### --distractors--

`gap`

---

`grid-column`

---

`grid-template-columns`

#### --answer--

`grid-set`

### --question--

#### --text--

Which of these properties can be used to center items inside a grid element?

#### --distractors--

`allow-items`

---

`set-items`

---

`center-items`

#### --answer--

`align-items`

### --question--

#### --text--

Which of the following is a correct value to use with the `grid-auto-columns` property?

#### --distractors--

`grid-auto-columns: unset-grid;`

---

`grid-auto-columns: revert-grid;`

---

`grid-auto-columns: set-content(20%);`

#### --answer--

`grid-auto-columns: 1fr;`

### --question--

#### --text--

What are grid tracks?

#### --distractors--

Shorthand for rows and columns.

---

Lines along which you can animate movement of the grid items.

---

Lines on which each of the grid items begins and ends.

#### --answer--

Spaces between two adjacent grid lines.

### --question--

#### --text--

Which of the following is the correct way to use the `minmax()` function?

#### --distractors--

```css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(apply);
}
```

---

```css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax();
}
```

---

```css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(set);
}
```

#### --answer--

```css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(150px, auto);
}
```

## --quiz--

### --question--

#### --text--

How do you position a grid item within a layout defined by `grid-template-areas`?

#### --distractors--

By directly defining the item's size and location within the grid using `grid-template-rows` and `grid-template-columns`.

---

By using the `grid-area` property and specifying both row and column start and end positions.

---

By setting both `grid-area` and explicit pixel coordinates.

#### --answer--

By assigning the named area to the item's `grid-area` property.

### --question--

#### --text--

What does the `grid-auto-rows` property control?

#### --distractors--

The height of explicitly defined rows.

---

The maximum width of grid columns.

---

The spacing between rows.

#### --answer--

The size of implicitly created rows.

### --question--

#### --text--

Which property would you use to make a grid item span multiple rows?

#### --distractors--

`grid-row-span`

---

`row-span`

---

`span-rows`

#### --answer--

`grid-row`

### --question--

#### --text--

What defines an explicit grid?

#### --distractors--

Tracks created automatically to fit content.

---

Tracks defined by the `fr` unit.

---

Tracks added with `grid-auto-flow`.

#### --answer--

Tracks explicitly set by `grid-template-columns` or `grid-template-rows`.

### --question--

#### --text--

Which value for `grid-auto-flow` would make new items fill columns first?

#### --distractors--

`row`

---

`vertical`

---

`row dense`

#### --answer--

`column`

### --question--

#### --text--

What is the purpose of `grid-template-areas`?

#### --distractors--

To auto-generate implicit tracks.

---

To replace the `fr` unit.

---

To set `z-index` values.

#### --answer--

To visually map items to named grid areas.

### --question--

#### --text--

How can you make a grid item start at column line 2 and end at column line 4?

#### --distractors--

`grid-column: 2 / span 4;`

---

`grid-column: start 2 / end 4;`

---

`grid-column: from 2 to 4;`

#### --answer--

`grid-column: 2 / 4;`

### --question--

#### --text--

What is the effect of `grid-template-columns: 1fr 2fr 1fr`?

#### --distractors--

Creates three equal-width columns.

---

Makes the middle column three times as wide as the others.

---

Forces all columns to be exactly `1fr` wide.

#### --answer--

Creates three columns where the middle is twice as wide as the sides.

### --question--

#### --text--

How would you create a grid with 3 equal columns and a `20px` gap between them?

#### --distractors--

```css
.container {
  display: grid;
  grid-template: repeat(3, 1fr) / 20px;
} 
```

---

```css
.container {
  display: grid;
  grid: 1fr 1fr 1fr / gap 20px;
}
```

---

```css
.container {
  display: grid;
  grid-template-columns: 20px 1fr 1fr 1fr;
}
```

#### --answer--

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

### --question--

#### --text--

What does `repeat(3, minmax(100px, 1fr))` create?

#### --distractors--

Three columns that can't shrink below `100px`.

---

Three fixed `100px` columns.

---

Three rows with maximum height of `1fr`.

#### --answer--

Three columns that grow proportionally but won't shrink below `100px`.

### --question--

#### --text--

Which statement about implicit grids is true?

#### --distractors--

Implicit grids ignore the `gap` property.

---

Implicit tracks must be defined with `grid-template-areas`.

---

Implicit tracks can only be created using the `grid-auto-flow` property.

#### --answer--

Implicit tracks are created when content doesn't fit explicit tracks.

### --question--

#### --text--

What does the `place-items` property do in CSS Grid?

#### --distractors--

It sets the size of grid items automatically based on available space.

---

It controls the grid template's column and row definitions.

---

It adjusts the order of grid items within the container.

#### --answer--

It is a shorthand for aligning grid items in both the block and inline axes.

### --question--

#### --text--

What does this CSS accomplish?

```css
.container {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
```

#### --distractors--

Creates fixed `150px` columns that overflow the container.

---

Creates columns that are exactly `1fr` wide regardless of content.

---

Creates a maximum of one column per `150px` of available width.

#### --answer--

Creates flexible columns that are at least `150px` and collapse when space is limited.

### --question--

#### --text--

How can you create asymmetric grid layouts?

#### --distractors--

By using only `fr` units.

---

By mixing different length units in `grid-template-columns`.

---

By setting `grid-asymmetric: true`.

#### --answer--

By defining different sizes for each track.

### --question--

#### --text--

What does `grid-column-start: 2` do to a grid item?

#### --distractors--

Makes it span 2 columns.

---

Offsets it by 2 pixels.

---

Positions it starting at the second vertical grid line.

#### --answer--

Makes it start at the second column line.

### --question--

#### --text--

Which property would you use to control overflow behavior in grid tracks?

#### --distractors--

`grid-overflow`

---

`track-sizing`

---

`fit-content`

#### --answer--

`minmax()`

### --question--

#### --text--

What will be the result for the following code?

```css
.container {
  display: grid;
  grid-template-columns: 100px 1fr 2fr;
  grid-template-rows: auto 150px;
  gap: 10px;
}
```

#### --distractors--

The container will have three columns of equal width, and two rows with `150px` height each.

---

The container will have three columns, all with `100px` width, and two rows with `150px` height.

---

The container will have two rows, each with a height of `1fr`.

#### --answer--

The container will have three columns: 100px, `1fr` and `2fr` wide and two rows: one auto and one with `150px` height.

### --question--

#### --text--

How would you make a grid item span all available rows?

#### --distractors--

`grid-row: full;`

---

`grid-row: auto / -1;`

---

`grid-row: 1 / span infinite;`

#### --answer--

`grid-row: 1 / -1;`

### --question--

#### --text--

Which property controls the alignment of grid items along the block axis?

#### --distractors--

`justify-items`

---

`place-items`

---

`align-content`

#### --answer--

`align-items`

### --question--

#### --text--

How can you ensure a grid item stays in the first column regardless of grid changes?

#### --distractors--

`grid-column: fixed;`

---

`grid-column: first;`

---

`grid-lock: column;`

#### --answer--

`grid-column: 1;`

---

## lab-product-landing-page

### Build a Product Landing Page
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. Your product landing page should have a `header` element with a corresponding `id="header"`.
2. You should have an image within the `header` element with a corresponding `id="header-img"` (A logo would make a good image here).
3. Within the `#header` element, you should have a `nav` element with a corresponding `id="nav-bar"`.
4. You should have at least three clickable elements inside the `nav` element, each with the class `nav-link`.
5. When you click a `.nav-link` button in the `nav` element, you should be taken to the corresponding section of the landing page.
6. You should have an embedded product video with `id="video"`.
7. Your landing page should have a `form` element with a corresponding `id="form"`.
8. Within the form, there should be an `input` field with `id="email"` where you can enter an email address.
9. The `#email` input field should have placeholder text to let users know what the field is for.
10. The `#email` input field should use HTML5 validation to confirm that the entered text is an email address.
11. Within the form, there should be a submit `input` with a corresponding `id="submit"`.
12. When you click the `#submit` element, the email should be submitted to a static page (use this mock URL: `https://www.freecodecamp.org/email-submit`).
13. The navbar should always be at the top of the viewport.
14. Your product landing page should have at least one media query.
15. Your product landing page should utilize CSS flexbox at least once.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

## css-animations

### What Are CSS Animations, and How Do They Work?


---

### What Are Accessibility Concerns Around Using Animations, and How Can prefers-reduced-motion Help?
Animations can greatly enhance the visual appeal and user experience of a website. However, they can also pose significant accessibility challenges for certain users. It's crucial to understand these concerns and implement solutions to ensure your website remains accessible to all users.

One of the primary accessibility concerns with animations is that they can cause discomfort or even physical harm to some users. People with vestibular disorders or motion sensitivity may experience dizziness, nausea, or headaches when exposed to certain types of movement on screen.

Additionally, animations can be distracting for users with cognitive disabilities or attention disorders. Rapid flashing or strobing effects are particularly problematic. They can trigger seizures in people with photosensitive epilepsy. As a general rule, avoid any content that flashes more than three times per second.

Another issue is that animations can make it difficult for some users to focus on or read content. This is especially true for users with low vision or reading difficulties who may struggle to track moving text or shifting layouts.

To address these concerns, CSS provides the `prefers-reduced-motion` media query. This feature allows web developers to detect if the user has requested minimal animations or motion effects at the system level.

Here's how you can use `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This CSS code snippet effectively disables most animations and transitions for users who have indicated a preference for reduced motion. Let's break it down:

The `@media` query rule checks if the user prefers reduced motion. If true, it applies the enclosed styles.

Inside the media query, we're targeting all elements (`*`) and overriding animation and transition properties.

We set `animation-duration` and `transition-duration` to an extremely small value (`0.01ms`). This essentially turns off the animations while still allowing them to complete, which can be important for certain functionality.

`animation-iteration-count: 1` ensures that any looping animations only play once.

`scroll-behavior: auto` disables smooth scrolling effects.

The `!important` declaration is used to ensure these rules take precedence over other animation styles.

It's important to note that while this method effectively reduces motion, it's a blanket approach. For more precise control, you might want to define specific reduced-motion alternatives for your animations.

Here's an example of a more targeted approach:

```css
.animated-element {
  transition: transform 0.3s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}
```

In this case, we're only disabling the `transition` for a specific element when reduced motion is preferred. This allows you to provide alternative, less motion-intensive experiences for users who need them.

Remember, the goal is not to completely remove all motion from your site, but to provide options that allow all users to comfortably interact with your content. Some motion can still be beneficial for usability and feedback, even for users who prefer reduced motion.

When implementing animations, consider using them thoughtfully rather than just for decoration. Avoid large, unexpected movements and provide controls to pause, stop, or hide animations when possible. Importantly, use the `prefers-reduced-motion` query to offer a low-motion alternative, ensuring your content remains accessible and comfortable for all users, including those sensitive to motion.

By being mindful of these accessibility concerns and utilizing tools like `prefers-reduced-motion`, you can create engaging, animated experiences that are inclusive and accessible to all users.

# --questions--

## --text--

What is the primary purpose of the `prefers-reduced-motion` media query?

## --answers--

To increase the speed of all animations.

### --feedback--

Think about how this query relates to user preferences for motion on their devices.

---

To detect if a user has requested minimal animations at the system level.

---

To automatically add more animations to a website.

### --feedback--

Think about how this query relates to user preferences for motion on their devices.

---

To change the color scheme of animations.

### --feedback--

Think about how this query relates to user preferences for motion on their devices.

## --video-solution--

2

## --text--

Which of the following is NOT a common accessibility concern related to animations?

## --answers--

They can cause discomfort for users with vestibular disorders.

### --feedback--

Consider how animations might affect different groups of users, including those with various disabilities.

---

They can be distracting for users with cognitive disabilities.

### --feedback--

Consider how animations might affect different groups of users, including those with various disabilities.

---

They always improve readability for all users.

---

They can trigger seizures in people with photosensitive epilepsy.

### --feedback--

Consider how animations might affect different groups of users, including those with various disabilities.

## --video-solution--

3

## --text--

In the context of `prefers-reduced-motion`, what does setting `animation-duration: 0.01ms !important;` achieve?

## --answers--

It makes animations last exactly 0.01 milliseconds.

### --feedback--

Think about the practical effect of an extremely short animation duration.

---

It increases the speed of animations.

### --feedback--

Think about the practical effect of an extremely short animation duration.

---

It effectively turns off animations while still allowing them to complete.

---

It makes animations last indefinitely.

### --feedback--

Think about the practical effect of an extremely short animation duration.

## --video-solution--

3

---

### Step 1
To start, add a `link` element for the `./styles.css` file.

---

### Step 2
Add a `div` within your `body` element and give it a `class` of `wheel`.

Inside your new `div`, add six `span` elements with a `class` set to `line`, and six `div` elements with a `class` set to `cabin`.

---

### Step 3
Create a selector for your `.wheel` element. Start by setting the `border` to `2px solid black`, the `border-radius` to `50%`, and the `margin-left` to `50px`.

---

### Step 4
Set the `position` property of the `.wheel` selector to `absolute`. Set the `height` and `width` both to `55vw`.

---

### Step 6
Create a selector for your `.line` elements. Start by setting the `background-color` to `black`, the `width` to `50%`, and the `height` to `2px`.

---

### Step 7
Set the `.line` selector's `position` property to `absolute`, the `left` property to `50%`, and the `top` property to `50%`.

---

### Step 8
The `transform-origin` property is used to set the point around which a CSS transformation is applied. For example, when you apply a `rotate` transformation (as you'll do later in this project), the `transform-origin` determines around which point the element is rotated.

Give the `.line` selector a `transform-origin` property of `0% 0%`. This will offset the origin point at `0%` from the left and `0%` from the top, setting it to the top left corner of the element.

---

### Step 9
Create a selector to target your second `.line` element. Set the `transform` property to `rotate(60deg)`.

Remember that the `transform` property allows you to manipulate the shape of an element. In this case, using the `rotate(60deg)` value will rotate the element around its `transform-origin` point by 60 degrees clockwise.

---

### Step 10
Using the same pattern, create a separate selector for the third `.line`, the fourth `.line`, the fifth `.line`, and the sixth `.line`.

Set the `transform` property for the third `.line` to `rotate(120deg)`, the fourth to `rotate(180deg)`, the fifth to `rotate(240deg)`, and the sixth to `rotate(300deg)`.

---

### Step 11
Create a `.cabin` selector. Set the `background-color` to `red`, the `width` to `20%`, and the `height` to `20%`.

---

### Step 12
Give the `.cabin` a `position` of `absolute`, and a `border` of `2px solid`.

---

### Step 13
Set the `.cabin` to have a `transform-origin` property of `50% 0%`. This will set the origin point to be offset `50%` from the left and `0%` from the top, placing it in the middle of the top edge of the element.

---

### Step 14
Time to position the cabins around the wheel. Select the first `.cabin` element. Set the `right` property to `-8.5%` and the `top` property to `50%`.

---

### Step 15
Continuing the pattern, select the following `.cabin` elements and apply the specific rules to them:

- The second `.cabin` should have the `right` property set to `17%` and the `top` property set to `93.5%`.
- The third `.cabin` should have the `right` property set to `67%` and the `top` property set to `93.5%`.
- The fourth `.cabin` should have the `left` property set to `-8.5%` and the `top` property set to `50%`.
- The fifth `.cabin` should have the `left` property set to `17%` and the `top` property set to `7%`.
- The sixth `.cabin` should have the `right` property set to `17%` and the `top` property set to `7%`.

---

### Step 16
The `@keyframes` at-rule is used to define the flow of a CSS animation. Within the `@keyframes` rule, you can create selectors for specific points in the animation sequence, such as `0%` or `25%`, or use `from` and `to` to define the start and end of the sequence.

`@keyframes` rules require a name to be assigned to them, which you use in other rules to reference. For example, the `@keyframes freeCodeCamp { }` rule would be named `freeCodeCamp`.

Time to start animating. Create a `@keyframes` rule named `wheel`.

---

### Step 17
You now need to define how your animation should start. To do this, create a `0%` rule within your `@keyframes wheel` rule. The properties you set in this nested selector will apply at the beginning of your animation.

As an example, this would be a `12%` rule:

```css
@keyframes freecodecamp {
  12% {
    color: green;
  }
}
```

---

### Step 18
Give the `0%` rule a `transform` property set to `rotate(0deg)`. This will start the animation with no rotation.

---

### Step 19
Now give the `@keyframes wheel` rule a `100%` selector. Within that, set the `transform` to `rotate(360deg)`. By doing this, your animation will now complete a full rotation.

---

### Step 20
The `animation-name` property is used to link a `@keyframes` rule to a CSS selector. The value of this property should match the name of the `@keyframes` rule. Give your `.wheel` selector an `animation-name` property set to `wheel`.

The `animation-duration` property is used to set how long the animation should sequence to complete. The time should be specified in either seconds (`s`) or milliseconds (`ms`). Set your `.wheel` selector to have an `animation-duration` property of `10s`.

---

### Step 21
The `animation-iteration-count` property sets how many times your animation should repeat. This can be set to a number, or to `infinite` to indefinitely repeat the animation. Your Ferris wheel should never stop, so set the `.wheel` selector to have an `animation-iteration-count` of `infinite`.

The `animation-timing-function` property sets how the animation should progress over time. There are a few different values for this property, but you want the Ferris wheel animation to run at the same rate from start to finish. Set the `animation-timing-function` to `linear` in your `.wheel` selector.

---

### Step 22
Create another `@keyframes` rule with the name `cabins`. Use the same properties as your `@keyframes wheel`, copying both the `0%` and `100%` rules, but set the `transform` property of the `100%` selector to `rotate(-360deg)`.

---

### Step 23
With your `.wheel` selector, you created four different properties to control the animation. For your `.cabin` selector, you can use the `animation` property to set these all at once.

Set the `animation` property of the `.cabin` rule to `cabins 10s linear infinite`. This will set the `animation-name`, `animation-duration`, `animation-timing-function`, and `animation-iteration-count` properties in that order.

---

### Step 24
To make your cabin animation seem more like a natural swinging motion, you can use the `ease-in-out` timing function. This setting will tell the animation to start and end at a slower pace, but move more quickly in the middle of the cycle.

Replace `linear` to `ease-in-out` in the `.cabin` selector.

---

### Step 25
You can use `@keyframes` rules to control more than just the transformation of an element. In the `0%` selector of your `@keyframes cabins`, set the `background-color` to `yellow`.

---

### Step 26
Between the `0%` and `100%` selectors, add a `50%` selector. This will apply in the middle of the animation cycle. Set the `background-color` to `purple`.

---

### Step 27
Because the animation is on an infinite loop and the start and end colors are not the same, the transition appears jerky when it switches back to yellow from red. 

To start fixing this, remove the `background-color` from your `0%` selector.

---

### Step 28
Create a new `25%` selector between your `0%` and `50%` selectors. Give this new selector the `background-color` property set to `yellow`.

---

### Step 29
Finally, create a new `75%` selector between your `50%` and `100%` selectors. Give this new selector a `background-color` property set to `yellow`.

With that, your animation is much smoother and your Ferris wheel is complete.

---

### Step 5
Give your `.wheel` selector a `max-height` and `max-width` property both set to `500px`.

---

### Build a Moon Orbit
In this lab, you will create a simple animation of the Moon's orbit around the Earth using HTML and CSS. The Earth will be at the center of the system, and the Moon will orbit around it.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should align all the elements to the center of the page by setting the height to `100%` of the viewport and setting a flexbox layout in the `body` element.
   
2. You should have a `div` with the class `space`.

3. Inside the `.space` element, there should be two more `div` elements with the class `earth` and `orbit`, respectively, in order.

4. Inside the `.orbit` element, there should be another `div` with the class `moon`.
   
5. The `div` element with a `class` of `space` should be centered on the page and have a width and height of `200px`.

6. The `div` element with a `class` of `space` should use `relative` positioning.

7. The `.earth` element should use `absolute` positioning. Position the center of the `.earth` element at the halfway point of its parent on both the vertical (top) and horizontal (left) axes. After that, shift the `.earth` element back by half its own width and height, to center it within its parent, the `.space` element.

8. The `.earth` element should have a width and height of `100px`.

9.  The `.orbit` element should have a width and height of `200px`.

10.  The `.orbit` element should be positioned using `absolute` positioning. Its bottom right corner should be at the center of the `.space` element using a `transform` property that shifts it by `-50%` on both the vertical and horizontal axes.

11. The orbit path for the moon around the Earth should be a circle.

12. The `.moon` element should be positioned using `absolute` positioning and have a width and height of `30px`. The `.moon` element should position itself at the top of the `.orbit` element and be centered horizontally.

13. You should further adjust the horizontal positioning of the `.moon` element by moving the element to the left by half of its width.

14. The `.earth` selector should have a background color and a `border-radius` of `50%`.

15. The `.moon` selector should have a background color and a `border-radius` of `50%`.

16. You should define a `@keyframes orbit` animation that rotates the `.orbit` element 360 degrees around its center. You should apply this animation to the `.orbit` element with a duration of `5` seconds, a linear timing function, and infinite iterations.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### Step 1
You will be building a happy Flappy Penguin, and further practicing CSS transforms and animations in the process.

Begin with linking your stylesheet to the page.

---

### Step 2
Target the `body` element to set the `background` to a linear gradient angled 45 degrees clockwise, starting at `rgb(118, 201, 255)` and ending at `rgb(247, 255, 222)`.

---

### Step 3
Normalize your page's sizing, by removing the `body` element's `margin` and `padding`.

---

### Step 5
Remove both the horizontal and vertical scrollbars, using only one property.

---

### Step 6
Within the `body`, add a `div` with a `class` of `ground`.

---

### Step 7
Target the `.ground` element, and set its `width` to take up the full width of the viewport. Then, set the `height` to `400px`.

---

### Step 8
Give the `.ground` element a `background` with a linear gradient angled 90 degrees clockwise, starting at `rgb(88, 175, 236)` and ending at `rgb(182, 255, 255)`.

---

### Step 10
Above the `.ground` element, add a `div` with a `class` of `penguin`. This `div` will contain Flappy Penguin.

---

### Step 11
Target the `.penguin` element, and set its `width` and `height` to `300px`.

---

### Step 12
Use the `margin` property to horizontally center the `.penguin` element, and set the `margin-top` to `75px`.

---

### Step 13
To create some scenery in the background, you will add two mountains.

Above the `.penguin` element, add a `div` with a `class` of `left-mountain`.

---

### Step 14
Target the `.left-mountain` element, and set its `width` and `height` to `300px`. Then, set the `background` to a linear gradient starting at `rgb(203, 241, 228)` and ending at `rgb(80, 183, 255)`.

---

### Step 15
To prevent the mountain from pushing the `.ground` element, adjust its `position` to prevent it from taking up space in the page layout.

---

### Step 16
To make the mountain look more like a mountain, you can use the `skew` transform function, which takes two arguments. The first being an angle to shear the x-axis by, and the second being an angle to shear the y-axis by.

Use the `transform` property to skew the mountain by `0deg` in the x-axis and `44deg` in the y-axis.

---

### Step 17
Set the stack level of the mountain element such that it remains directly behind the `.ground` element.

---

### Step 18
To overlap the mountain and `.ground` elements better, give the mountain a `margin-top` of `100px`, and the `.ground` element a `margin-top` of `-58px`.

---

### Step 19
To give the effect of a mountain range, add another mountain, by creating a new `div` immediately after `.left-mountain`, and give the new `div` the `class` of `back-mountain`.

---

### Step 20
Target the `.back-mountain` element, and set its `width` and `height` to `300px`. Then, set the `background` to a linear gradient starting at `rgb(203, 241, 228)` and ending at `rgb(47, 170, 255)`.

---

### Step 21
Set the `position` property of the `.back-mountain` to prevent it from taking up space in the page layout.

---

### Step 22
Change the stack level of the `.back-mountain` element such that it is directly behind the `.left-mountain` element.

---

### Step 23
Rotate the `.back-mountain` element by `45deg` clockwise. Then, give it a `left` property of `110px`, and a `top` property of `225px`.

---

### Step 24
To finish the background, add a sun, by creating a new `div` element immediately after the `.back-mountain` element, and give it the class of `sun`.

---

### Step 25
Give the `.sun` element a `width` and `height` of `200px`, and a `background-color` of `yellow`.

---

### Step 26
Set the `position` property of the sun to prevent it from taking up space in the page layout, and set the `border-radius` such that the sun's shape is a circle.

---

### Step 27
Position the sun in the top right corner of the screen such that `75px` of its top and right edges are off screen.

---

### Step 28
Your penguin will consist of two main sections: the head, and the body.

Within `.penguin`, add two new `div` elements. The first with a `class` of `penguin-head`, and the second with a `class` of `penguin-body`.

---

### Step 29
Change the stack level of the `.penguin` element such that it appears in front of the `.ground` element, and give it a `position` of `relative`.

---

### Step 9
As the `.ground` element will be third in the stacking context of the page layout, set its `z-index` to `3`, and `position` to `absolute`.

---

### Step 30
Target the `.penguin-head` element, and give it a `width` half of its parent's, and a `height` of `45%`. Then, set the `background` to a linear gradient at `45deg` starting at `gray`, and ending at `rgb(239, 240, 228)`.

---

### Step 31
_Most_ penguins do not have a square head.

Give the penguin a slightly oval head by setting the radius of the top corners to `70%` and the radius of the bottom corners to `65%`.

---

### Step 32
Target the `.penguin-body` element, and give it a `width` of `53%`, and a `height` of `45%`. Then, set the `background` to a linear gradient at `45deg`, `rgb(134, 133, 133)` from `0%`, `rgb(234, 231, 231)` from `25%`, and `white` from `67%`.

---

### Step 33
Another interesting fact about penguins is that they do not have square bodies.

Use the `border-radius` property with a value of `80% 80% 100% 100%`, to give the penguin a slightly rounded body.

---

### Step 34
Target all descendent elements of the `.penguin` element, and give them a `position` of `absolute`.

---

### Step 35
Position the `.penguin-head` element `10%` from the top, and `25%` from the left of its parent.

---

### Step 36
Position the `.penguin-body` element `40%` from the top, and `23.5%` from the left of its parent.

---

### Step 37
Change the stack level of the `.penguin-head` element such that it appears in front of the `.penguin-body` element.

---

### Step 38
To give the penguin body a crest, create a pseudo-element that is the first child of the `.penguin-body` element. Set the `content` property of the pseudo-element to an empty string.

---

### Step 39
Position the pseudo-element relative to its closest positioned ancestor.

---

### Step 40
Give the pseudo-element a `width` half that of its parent, a `height` of `45%`, and a `background-color` of `gray`.

---

### Step 41
Position the pseudo-element `10%` from the top and `25%` from the left of its parent.

---

### Step 42
Round off the crest, by giving the pseudo-element bottom corners a radius of `100%`, leaving the top corners at `0%`.

---

### Step 43
Increase the pseudo-element's transparency by `30%`.

---

### Step 44
Start the penguin's face, by adding two `div` elements within `.penguin-head`, and giving them both a `class` of `face`.

---

### Step 45
Give the `.face` elements a `width` of `60%`, a `height` of `70%`, and a `background-color` of `white`.

---

### Step 46
Make the top corners of the `.face` elements have a radius of `70%`, and the bottom corners have a radius of `60%`.

---

### Step 47
Position the `.face` elements so that they are `15%` from the top.

---

### Step 48
Currently, the two `.face` elements are on top of each other.

Fix this, by adding a `class` of `left` to the first `.face` element, and a `class` of `right` to the second `.face` element.

---

### Step 49
Target the `.face` element with the `left` class, and position it `5%` left of its parent.

---

### Step 50
Target the `.face` element with the `right` class, and position it `5%` right of its parent.

---

### Step 51
Below the `.face.right` element, add a `div` element with a `class` of `chin`.

---

### Step 52
Target the `.chin` element, and give it a `width` of `90%`, `height` of `70%`, and `background-color` of `white`.

---

### Step 53
Position the `.chin` element such that it is `25%` from the top, and `5%` from the left of its parent. Then, give the top corners a radius of `70%`, and the bottom corners a radius of `100%`.

---

### Step 54
So far, the `.face` and `.chin` elements have the same `background-color`.

Create a custom CSS property called `--penguin-face`, and set it to `white`.

---

### Step 55
Where relevant, replace property values with your `--penguin-face` variable.

---

### Step 56
Below the `.chin` element, add two `div` elements each with a `class` of `eye`. Also, give the first `.eye` element a `class` of `left`, and the second `.eye` element a `class` of `right`.

---

### Step 57
Target the `.eye` elements, and give them a `width` of `15%`, `height` of `17%`, and `background-color` of `black`.

---

### Step 58
Position the `.eye` elements `45%` from the top of their parent, and give all corners a radius of `50%`.

---

### Step 59
Target the `.eye` element with the `left` class, and position it `25%` from the left of its parent. Then, target the `.eye` element with the `right` class, and position it `25%` from the right of its parent.

---

### Step 60
Within each `.eye` element, add a `div` with a `class` of `eye-lid`.

---

### Step 61
Target the `.eye-lid` elements, and give them a `width` of `150%`, `height` of `100%`, and `background-color` of `--penguin-face`.

---

### Step 62
Position the `.eye-lid` elements `25%` from the top, and `-23%` from the left of their parents. Then, give all corners a radius of `50%`.

---

### Step 63
Below the `.eye.right` element, add two `div` elements each with a `class` of `blush`. Also, give the first `.blush` element a `class` of `left`, and the second `.blush` element a `class` of `right`.

---

### Step 64
Target the `.blush` elements, and give them a `width` of `15%`, `height` of `10%`, and `background-color` of `pink`.

---

### Step 65
Position the `.blush` elements `65%` from the top of their parent, and give all corners a radius of `50%`.

---

### Step 66
Target the `.blush` element with a `class` of `left`, and position it `15%` left of its parent. Then, target the `.blush` element with a `class` of `right`, and position it `15%` right of its parent.

---

### Step 67
Below the `.blush.right` element, add two `div` elements each with a `class` of `beak`. Also, give the first `.beak` element a `class` of `top`, and the second `.beak` element a `class` of `bottom`.

---

### Step 68
Target the `.beak` elements, and give them a `height` of `10%`, `background-color` of `orange`, and give all corners a radius of `50%`.

---

### Step 69
Target the `.beak` element with a `class` of `top`, give it a `width` of `20%`, and position it `60%` from the top, and `40%` from the left of its parent.

---

### Step 70
Target the `.beak` element with a `class` of `bottom`, and give it a `width` that's `4%` smaller than `.beak.top`, `5%` further from the top, and `2%` further from the left of its parent than `.beak.top`.

---

### Step 71
The penguin's body looks a bit plain. Spruce him up by adding a `div` element with a `class` of `shirt`, immediately before the `.penguin-body` element.

---

### Step 72
Within the `.shirt` element, add a `div` with the following emoji as content: 💜

---

### Step 73
Within `.shirt`, after the `div` element, add a `p` element with the following content: `I CSS`

---

### Step 74
Target the `.shirt` element, and set its `font-size` to `25px`, `font-family` to `Helvetica` with a fallback of `sans-serif`, and `font-weight` to `bold`.

---

### Step 75
In some browsers, the _heart_ emoji may look slightly different from the previous step. This is because some of the character's properties were overridden by the `font-weight` style of `bold`.

Fix this, by targeting the `div` with the heart emoji, and setting its `font-weight` to its original value.

---

### Step 76
Position the `div` with the heart emoji `22.5px` from the top, and `12px` from the left of its parent.

---

### Step 77
Position the `.shirt` element `165px` from the top, and `127.5px` from the left of its parent. Then, increase its stacking order such that it appears above the `.penguin-body` element.

---

### Step 78
For the shirt's final touch, set the `color` to `#6a6969`.

---

### Step 79
Fun fact: Penguins cannot stand without at least two feet.

Within the `.penguin-body` element, add two `div` elements each with a `class` of `foot`. Give the first `.foot` a `class` of `left`, and the second `.foot` a `class` of `right`.

---

### Step 80
Target the `.foot` elements, and give them a `width` of `15%`, `height` of `30%`, and `background-color` of `orange`.

---

### Step 81
Position the `.foot` elements `85%` from the top of their parent, and give all corners a radius of `50%`.

---

### Step 82
The penguin's beak and feet share the same `color`.

Create a new custom CSS variable named `--penguin-picorna`, and replace all relevant property values with it.

---

### Step 83
Target the `.foot` element with a `class` of `left`, and position it `25%` left of its parent. Then, target the `.foot` element with a `class` of `right`, and position it `25%` right of its parent.

---

### Step 84
To make the penguin's feet look more _penguiny_, rotate the left foot by `80deg`, and the right by `-80deg`.

---

### Step 85
Change the stacking order of the `.foot` elements such that they appear beneath the `.penguin-body` element.

---

### Step 86
Fun fact: Penguins cannot fly without wings.

Within `.penguin-body`, before the `.foot` elements, add two `div` elements each with a `class` of `arm`. Give the first `.arm` a `class` of `left`, and the second `.arm` a `class` of `right`.

---

### Step 87
Target the `.arm` elements, and give them a `width` of `30%`, a `height` of `60%`, and a `background` of linear gradient at `90deg` from clockwise, starting at `gray`, and ending at `rgb(209, 210, 199)`.

---

### Step 88
Create a custom CSS variable named `--penguin-skin`, and set it to `gray`. Then, replace all relevant property values with it.

---

### Step 89
Target the `.arm` element with a `class` of `left`, and position it `35%` from the top, and `5%` from the left of its parent. Then, target the `.arm` element with a `class` of `right`, and position it `0%` from the top, and `-5%` from the right of its parent.

---

### Step 90
Within the `.arm.left` selector, alter the origin of the `transform` function to be the top left corner of its parent.

---

### Step 91
To keep the linear gradient on the correct side of the penguin's left arm, first rotate it by `130deg`, then invert the x-axis.

---

### Step 92
Rotate the right arm by `45deg` counterclockwise.

---

### Step 93
Fun fact: Most, if not all, flippers are not naturally rectangles.

Give the `.arm` elements' top-left, top-right, and bottom-right corners a radius of `30%`, and the bottom-left corner a radius of `120%`.

---

### Step 94
Change the `.arm` elements' stacking order such that they appear behind the `.penguin-body` element.

---

### Step 95
Now, you are going to use CSS animations to make the penguin wave.

Define a new `@keyframes` named `wave`.

---

### Step 96
Give `wave` four waypoints starting at `10%`, and incrementing by `10%`.

---

### Step 97
Within the first waypoint, rotate to `110deg`, and retain the scaling of the left arm.

---

### Step 98
Within the second waypoint, rotate to `130deg`, and retain the scaling of the left arm.

---

### Step 99
For the third and fourth waypoints, repeat the `transform` pattern once more.

---

### Step 100
Use the `wave` animation on the left arm. Have the animation last `3s`, infinitely iterate, and have a linear timing function.

---

### Step 101
Target the `.penguin` element when it is active, and increase its size by `50%` in both dimensions.

---

### Step 102
When you activate the `.penguin` element, it might look as though you can drag it around. This is not true.

Indicate this to users, by giving the active element a `cursor` property of `not-allowed`.

---

### Step 103
Change the `.penguin` element's `transition` behavior during transformation to have a duration of `1s`, a timing function of `ease-in-out`, and a delay of `0ms`.

---

### Step 104
Finally, calculate the `height` of the `.ground` element to be the height of the viewport minus the height of the `.penguin` element.

Congratulations! You have completed the Flappy Penguin Workshop.

---

### Step 4
Normalize your page, by setting the `width` to `100%`, and `height` to `100vh`.

---

### Build a Personal Portfolio
**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. Your portfolio should have a welcome section with an `id` of `welcome-section`.
2. The welcome section should have an `h1` element that contains text.
3. Your portfolio should have a projects section with an `id` of `project-section`.
4. The projects section should contain at least one element with a `class` of `project-tile` to hold a project.
5. The projects section should contain at least one link to a project.
6. Your portfolio should have a navbar with an id of `navbar`.
7. The navbar should contain at least one link that you can click on to navigate to different sections of the page.
8. Your portfolio should have a link with an id of `profile-link`, which opens your GitHub or freeCodeCamp profile in a new tab.
9. Your portfolio should have at least one media query.
10. The height of the welcome section should be equal to the height of the viewport.
11. The navbar should always be at the top of the viewport.

**Note:** Be sure to link your stylesheet in your HTML and apply your CSS.

---

### CSS Animations Review


---

### CSS Animations Quiz
To pass the quiz, you must correctly answer at least 18 of the 20 questions below.

# --quizzes--

## --quiz--

### --question--

#### --text--

What is the purpose of the `transform` property in CSS?

#### --distractors--

To change the visibility of an element.

---

To apply a visual effect to text.

---

To set the dimensions of an element.

#### --answer--

To modify the position, size, and shape of an element.

### --question--

#### --text--

How does the CSS `animation-direction` property affect an animation?

#### --distractors--

It specifies if an animation should be repeated.

---

It sets the duration of the animation.

---

It defines the speed of the animation.

#### --answer--

It defines how an animation should play.

### --question--

#### --text--

Which CSS property makes an animation run 3 times?

#### --distractors--

`animation-repeat: 3`

---

`animation-loop: 3`

---

`animation-delay: 3`

#### --answer--

`animation-iteration-count: 3`

### --question--

#### --text--

Which CSS timing function makes an animation run at a consistent speed from start to end?

#### --distractors--

`ease`

---

`ease-in`

---

`ease-in-out`

#### --answer--

`linear`

### --question--

#### --text--

What does the `@keyframes` at-rule define in CSS?

#### --distractors--

The colors of a CSS gradient.

---

The angles of a CSS rotation.

---

The dimensions of an element.

#### --answer--

The stages of a CSS animation.

### --question--

#### --text--

What is the purpose of the `translateX()` function in CSS?

#### --distractors--

It changes the opacity of the element.

---

It rotates the element.

---

It repositions the element vertically.

#### --answer--

It repositions the element horizontally.

### --question--

#### --text--

Which of the following is NOT a potential concern with CSS animations?

#### --distractors--

They may cause discomfort or physical harm to certain users.

---

Users may find them distracting.

---

Overuse can lead to poor performance.

#### --answer--

They can enhance user experience.

### --question--

#### --text--

Where is the `@keyframes` at-rule defined?

#### --distractors--

Within the `body` element of an HTML file.

---

Within the `head` element of an HTML file.

---

Within a CSS class definition.

#### --answer--

At the top level, outside of any CSS selectors.

### --question--

#### --text--

Which CSS property allows you to pause and resume an animation?

#### --distractors--

`animation-timing-function`

---

`animation-delay`

---

`animation-direction`

#### --answer--

`animation-play-state`

### --question--

#### --text--

What value should be assigned to the `animation-name` property in CSS?

#### --distractors--

The duration of the animation in seconds.

---

The timing function used for the animation.

---

The delay before the animation starts in seconds.

#### --answer--

The name of the animation defined by the `@keyframes`.

### --question--

#### --text--

What does this `@keyframes` at-rule do to the animated element?

```css
@keyframes animation {
  0% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(100px);
  }
}
```

#### --distractors--

It rotates the element 90 degrees clockwise.

---

It changes the color of the element to blue.

---

It scales the element to 50% of its initial size and then to 100% of its initial size.

#### --answer--

It moves the element horizontally from -50px to 100px, relative to its starting point.

### --question--

#### --text--

Which CSS property defines how an animation progresses over time?

#### --distractors--

`animation-delay`

---

`animation-fill-mode`

---

`animation-iteration-count`

#### --answer--

`animation-timing-function`

### --question--

#### --text--

Which CSS property is used to specify that an animation should take 5 seconds to complete?

#### --distractors--

```css
animation-name: 5s;
```

---

```css
animation-delay: 5s;
```

---

```css
animation-timing-function: 5s;
```

#### --answer--

```css
animation-duration: 5s;
```

### --question--

#### --text--

What does `50%` represent in the following CSS `@keyframes` at-rule?

```css
@keyframes animation {
  0% {
    transform: translateX(-50px);
  }
  50% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(100px);
  }
}
```

#### --distractors--

The starting point of the animation.

---

The ending point of the animation.

---

The speed of the animation.

#### --answer--

The halfway point of the animation.

### --question--

#### --text--

What will happen when the property `transform: translateX(200px);` is applied?

#### --distractors--

The element will move 200px to the left.

---

The element will move 200px to the bottom.

---

The element will rotate 200 degrees clockwise.

#### --answer--

The element will move 200px to the right.

### --question--

#### --text--

How will the animation behave if `animation-iteration-count` is set to `infinite`?

#### --distractors--

It will run once and stop.

---

It will pause after the first iteration.

---

It will stop after three iterations.

#### --answer--

It will repeat indefinitely.

### --question--

#### --text--

Which `@keyframes` selector specifies the starting point of an animation?

#### --distractors--

`50%`

---

`25%`

---

`100%`

#### --answer--

`0%`

### --question--

#### --text--

What properties can be specified using the `animation` shorthand CSS property?

#### --distractors--

Only the name of the animation.

---

The name and duration of the animation.

---

The name, duration, and delay of the animation.

#### --answer--

All animation properties.

### --question--

#### --text--

Which CSS property is used to apply an animation defined by an `@keyframes` at-rule?

#### --distractors--

`animation-duration`

---

`apply`

---

`translate`

#### --answer--

`animation`

### --question--

#### --text--

Which CSS property allows you to set a time before the animation begins?

#### --distractors--

`animation-fill-mode`

---

`animation-timing-function`

---

`animation-iteration-count`

#### --answer--

`animation-delay`

## --quiz--

### --question--

#### --text--

What does the CSS `animation-delay` property do?

#### --distractors--

Sets how long the animation lasts.

---

Specifies the timing function.

---

Defines animation direction.

#### --answer--

Delays the start of the animation.

### --question--

#### --text--

Which animation property specifies how the element should be styled before and after the animation?

#### --distractors--

`animation-delay`

---

`animation-direction`

---

`animation-iteration-count`

#### --answer--

`animation-fill-mode`

### --question--

#### --text--

Why should CSS animations be used in moderation?

#### --distractors--

Too many CSS animations can lead to styles breaking as well as inconsistent styles across different browsers. 

---

Too many CSS animations can lead to lower or nonexistent rankings in search engine results.

---

Too many CSS animations will automatically crash the server and increase the likelihood for security risks. 

#### --answer--

Too many CSS animations can lead to poor performance and may be distracting or problematic for users with certain accessibility needs.

### --question--

#### --text--

Which animation property determines whether the animation should play forwards, backwards, or alternate?

#### --distractors--

`animation-fill-mode`

---

`animation-delay`

---

`animation-timing-function`

#### --answer--

`animation-direction`

### --question--

#### --text--

Which CSS media query detects if the user has requested minimal animations or motion effects?

#### --distractors--

`reduce-motion`

---

`min-motion-preference`

---

`motion-preferences`

#### --answer--

`prefers-reduced-motion`

### --question--

#### --text--

Which property sets how many times an `animation` repeats?

#### --distractors--

`animation-duration`

---

`animation-count`

---

`animation-delay`

#### --answer--

`animation-iteration-count`

### --question--

#### --text--

Which CSS rule is used to define the stages and styles of an animation at various points during its duration?

#### --distractors--

`@style`

---

`@transition`

---

`@transform`

#### --answer--

`@keyframes`

### --question--

#### --text--

Inside the `prefers-reduced-motion` media query, which declaration disables transitions?

#### --distractors--

`animation: none;`

---

`transition: remove;`

---

`animation-play-state: paused;`

#### --answer--

`transition: none;`

### --question--

#### --text--

What does the `animation-play-state` property allow you to do?

#### --distractors--

Set how many times the animation repeats.

---

Specify how long the animation takes to complete.

---

Determine the direction in which the animation plays.

#### --answer--

Pause and resume the animation.

### --question--

#### --text--

Which of the following is a good practice when working with animations?

#### --distractors--

Use as many flashing colors and rapid movements as possible to grab attention.

---

Avoid testing animations on different devices or screen sizes.

---

Make animations last as long as possible to ensure users notice them.

#### --answer--

Avoid content that flashes more than three times per second to prevent triggering seizures or causing discomfort.

### --question--

#### --text--

Why is the `!important` declaration used in the CSS rules?

#### --distractors--

To prevent other media queries from loading.

---

To limit styles to the first child element.

---

To debug CSS more easily.

#### --answer--

To ensure these rules take precedence over other styles.

### --question--

#### --text--

What does `animation-iteration-count: 1 !important;` ensure in CSS?

#### --distractors--

That animations are paused.

---

That animations run infinitely.

---

That animations reverse direction each cycle.

#### --answer--

That any looping animations only play once.

### --question--

#### --text--

What CSS property is used to specify how long an animation should take to complete?

#### --distractors--

`animation-delay`

---

`animation-timing-function`

---

`animation-iteration-count`

#### --answer--

`animation-duration`

### --question--

#### --text--

Which property is NOT part of the `animation` shorthand?

#### --distractors--

`animation-delay`

---

`animation-timing-function`

---

`animation-direction`

#### --answer--

`animation-transform`

### --question--

#### --text--

What does the `@keyframes` rule define?

#### --distractors--

The timing function of an animation.

---

The default state of an element.

---

The media queries for animations.

#### --answer--

The sequence of styles at different points in an animation.

### --question--

#### --text--

What does this `@keyframes` at-rule do to the animated element?

```css
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

#### --distractors--

It scales the element up from 0% to 100%.

---

It moves the element from left to right.

---

It changes the text color to black.

#### --answer--

It makes the element fade in by gradually decreasing its transparency.

### --question--

#### --text--

In a keyframes rule, what does `100%` represent?

#### --distractors--

The start of the animation.

---

The halfway point.

---

The easing function.

#### --answer--

The end of the animation.

### --question--

#### --text--

Which property controls the pace of an `animation` over its duration?

#### --distractors--

`animation-duration`

---

`animation-delay`

---

`animation-iteration-count`

#### --answer--

`animation-timing-function`

### --question--

#### --text--

What should developers consider when implementing animations to maintain accessibility?

#### --distractors--

Rely entirely on JavaScript for all animations.

---

Add frequent and intense animations for impact.

---

Include only bold, fast, and surprising effects.

#### --answer--

Use subtle, intentional effects, honor preferences, and offer user control.

### --question--

#### --text--

Which of the following is the correct syntax to slide an element in from the left?

#### --distractors--

```css
@keyframes slide-in {
  0 { 
    transform: translate(-100%); 
  }
  100 { 
    transform: translate(0); 
  }
}
```

---

```css
@keyframes slide-in {
  from { 
    translateX(-100%); 
  }
  to { 
    translateX(0); 
  }
}
```

---

```css
@keyframes slide-in {
  start { 
    transform: moveX(-100%); 
  }
  end { 
    transform: moveX(0); 
  }
}
```

#### --answer--

```css
@keyframes slide-in {
  0% { 
    transform: translateX(-100%); 
  }
  100% { 
    transform: translateX(0); 
  }
}
```

---

## review-css

### CSS Review


---

# RESPONSIVE-WEB-DESIGN-CERTIFICATION-EXAM

## responsive-web-design-certification-exam

### Responsive Web Design Certification Exam
Start your exam in the exam environment app.

---

