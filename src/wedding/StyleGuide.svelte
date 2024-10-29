<main>
    <h1>Style Guide</h1>

    <h2>Headings</h2>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>

    <h2>Paragraphs</h2>
    <p>This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula gravida mi vel molestie.</p>

    <h2>Links</h2>
    <p>This is a <a href="#/">link</a>.</p>

    <h2>Lists</h2>
    <ul>
        <li>Unordered list item 1</li>
        <li>Unordered list item 2</li>
        <li>Unordered list item 3</li>
    </ul>
    <ol>
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
    </ol>

    <h2>Tables</h2>
    <table>
        <thead>
            <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
                <td>Row 1, Cell 3</td>
            </tr>
            <tr>
                <td>Row 2, Cell 1</td>
                <td>Row 2, Cell 2</td>
                <td>Row 2, Cell 3</td>
            </tr>
        </tbody>
    </table>

    <h2>Forms</h2>
    <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">

        <label for="email">Email:</label>
        <input type="email" id="email" name="email">

        <label for="message">Message:</label>
        <textarea id="message" name="message"></textarea>

        <label for="colors">Choose a color:</label>
        <select id="colors" name="colors">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
        </select>

        <button type="submit">Submit</button>
    </form>

    <h2>Inline Elements</h2>
    <p>This is some <strong>bold text</strong> and this is some <em>italic text</em>. Here's an inline <code>code snippet</code>.</p>

    <h2>Blockquote</h2>
    <blockquote>This is a blockquote. It is often used to indicate a quote or an important passage.</blockquote>

    <h2>Horizontal Rule</h2>
    <hr>

    <h2>Buttons</h2>
    <button>Primary Button</button>

    <h2>Resources</h2>
    <ul>
        <li><a href="https://brandingstyleguides.com/">Branding Style Guides</a></li>
        <li><a href="https://coolors.co/">Color Palette Generator</a></li>
    </ul>
    <h2>Inspiration</h2>
    <ul>
        <li><a href="https://veleyross.wedding/">Marry Monday</a></li>
        <li><a href="https://jenhuangphoto.com/">Jen Huang Photo</a></li>
    </ul>

</main>


<style lang="sass">
$font-family: Arial, sans-serif
$link-color: blue
$link-hover-color: darkblue
$table-border: 1px solid #ccc
$table-padding: 10px
$blockquote-border-color: #ccc
$blockquote-text-color: #666

body
  font-family: $font-family
  margin: 20px

h1, h2, h3, h4, h5, h6
  margin: 10px 0

p
  margin: 10px 0

a
  color: $link-color
  text-decoration: underline

  &:hover
    color: $link-hover-color

ul, ol
  margin: 10px 0
  padding-left: 20px

table
  width: 100%
  border-collapse: collapse
  margin: 10px 0

  th, td
    border: $table-border
    padding: $table-padding
    text-align: left

button, input, textarea, select
  margin: 10px 0

code
  background-color: #f5f5f5
  padding: 5px
  border-radius: 5px

blockquote
  border-left: 5px solid $blockquote-border-color
  padding-left: 10px
  color: $blockquote-text-color
  font-style: italic

hr
  margin: 20px 0
  border: 1px solid #ddd
</style>