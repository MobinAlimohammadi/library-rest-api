import express from 'express';

const app = express();

const PORT = process.env.PORT  || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let books = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, isAvailable: true },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949, isAvailable: true },
    { id: 3, title: 'Moby Dick', author: 'Herman Melville', year: 1851, isAvailable: true }
];

app.post(`/books`,(req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        isAvailable: true
    };
    books.push(book);
    res.send(book);
});


app.get(`/books/available`, (req, res) => {
    
    const available = books.filter(book => book.isAvailable);

    
    res.send(available);
});



app.post(`/books/borrow`,(req, res) => {

    const book = books.find( bo => bo.title === req.body.title);
    if(!book) return res.status(404).send(`Book not found.`);

    if (!book.isAvailable) {
        return res.status(400).send('Book is already borrowed.');
    }

    book.isAvailable = false;

    res.send({
        id: book.id,
        title: book.title,
        author: book.author,
        year: book.year,
        isAvailable: book.isAvailable
    });
});

app.post(`/books/return`, (req, res) => {

    const book = books.find( bo => bo.title === req.body.title);
    if(!book) return res.status(404).send(`Book not found.`);
    
    if (book.isAvailable) {
        return res.status(400).send('Book is already returned.');
    }
    
    book.isAvailable = true;
    
    res.send({
        id: book.id,
        title: book.title,
        author: book.author,
        year: book.year,
        isAvailable: book.isAvailable
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
