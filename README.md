
# Progetto Node.js - Sistema di Prodotti, Utenti e Ordini "Swap"

## Descrizione

Questo progetto è un'applicazione web basata su Node.js che gestisce un sistema di prodotti, utenti e ordini di tipo "swap". Il sistema utilizza **Express** come framework per la gestione delle richieste HTTP, **Knex.js** con MySQL per l'interazione con il database, e **Multer** per la gestione dei file caricati.

## Funzionalità

- Gestione degli utenti (registrazione, login, gestione profilo)
- Aggiunta, aggiornamento e visualizzazione dei prodotti
- Creazione e gestione degli ordini di tipo "swap"
- Upload di file associati ai prodotti tramite **Multer**
- Test delle API RESTful con **Sinon** per assicurare la qualità del codice

## Struttura del Progetto

```
project-directory/
├── routes/            # Gestisce le route dell'applicazione
├── migrations/        
├── .env               # File di configurazione ambiente (per variabili sensibili)
├── app.js             # Punto di entrata dell'app
└── package.json       # Dipendenze e script
├── db.js            
```

## Installazione

Per avviare il progetto in locale, segui questi passaggi:

1. **Clona il repository**:

   ```bash
   git clone <url-del-repository>
   cd <nome-del-repository>
   ```

2. **Installa le dipendenze**:

   Assicurati di avere **Node.js** e **npm** installati.

   ```bash
   npm install
   ```

3. **Configura l'ambiente**:

   Crea un file `.env` nella radice del progetto e aggiungi le variabili di ambiente necessarie:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=nome_del_database
   ```

4. **Avvia l'app**:

   ```bash
   npm start
   ```

   L'app sarà disponibile su `http://localhost:3000`.

## Test

Per eseguire i test unitari, utilizza il comando:

```bash
npm test
```

I test sono scritti utilizzando **Sinon** per simulare le dipendenze e verificare il comportamento delle API.

## Tecnologie Utilizzate

- **Node.js**: Ambiente di esecuzione per il server.
- **Express**: Framework per costruire l'applicazione web.
- **Knex.js**: Query builder per interagire con il database MySQL.
- **MySQL**: Sistema di gestione del database.
- **Multer**: Middleware per la gestione del caricamento dei file.
- **Sinon**: Libreria per i test unitari e la simulazione delle API RESTful.
- **EJS**: Motor di template per generare HTML dinamico.
  
## Contribuire

Se vuoi contribuire al progetto:

1. Fork il repository.
2. Crea un branch per la tua feature (`git checkout -b feature/nuova-feature`).
3. Fai il commit delle tue modifiche (`git commit -am 'Aggiungi nuova feature'`).
4. Push il tuo branch (`git push origin feature/nuova-feature`).
5. Apri una pull request.


