const { program } = require("commander");
const fs = require('fs/promises');
const chalk = require("chalk");
// const { read } = require("fs");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // TODO: Pull a random quote from the quotes.txt file
    // console log the quote and author
    // You may style the text with chalk as you wish

    outputRandomQuote()
      
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving

    addQuoteToFile(quote, author)

  });

program.parse();



async function outputRandomQuote(){
  try{
    const readData = await fs.readFile(QUOTE_FILE, 'utf-8')
    var dataAarray = readData.split("\n") //store lines of text in array
    dataAarray = dataAarray.filter(line => line != "") //removes any potential blank lines from list
    const randomQuoteLine = Math.floor(Math.random() * ((dataAarray.length -1)-0 +0)) //create random # within array length
    const quoteArray = dataAarray[randomQuoteLine].split('|') //separate line into array per | separator
    const quote = quoteArray[0]
    const author = quoteArray[1]
    console.log(chalk.bold('Quote: ') + chalk.italic('"' + quote + '"') + chalk.bold('\nAuthor: ') + chalk.italic(author))
  }
  catch{
    console.log("Error reading file")
  }
     
} 

async function addQuoteToFile(quote, author){
  try{
    if(!author){ //if author is not provided, set to Anonymous
      author = "Anonymous"
    }
    const newQuote = (quote + "|" + author) //combine & format quote and author into new line format
    await fs.appendFile(QUOTE_FILE, newQuote + "\n")
    console.log(chalk.bold('Quote: ') + chalk.italic('"' + quote + '"') + chalk.bold('\nAuthor: ') + chalk.italic(author))
  }
  catch{
    console.log("Error adding quote")
  }
     
} 