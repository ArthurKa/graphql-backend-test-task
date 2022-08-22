import { Database } from 'sqlite3';
import { castTo, Token, TokenPayload } from 'types';

const tableName = 'tokens';

const db = new Database(':memory:');

export const model = {
  prepare(): Promise<void> {
    return new Promise((res, rej) => {
      db.serialize(() => {
        db.run(`CREATE TABLE ${tableName} (token TEXT)`, err => {
          if(err) {
            rej(err);
            return;
          }

          res();
        });
      });
    });
  },
  find(): Promise<Token[]> {
    return new Promise((res, rej) => {
      db.serialize(() => {
        const tokens: Token[] = [];

        db.each(
          `SELECT rowid as id, * FROM ${tableName}`,
          (err, row) => {
            if(err) {
              rej(err);
              return;
            }

            castTo<Token>(row);

            tokens.push(row);
          },
          err => {
            if(err) {
              rej(err);
              return;
            }

            res(tokens);
          },
        );
      });
    });
  },
  create({ token }: TokenPayload): Promise<Token> {
    return new Promise((res, rej) => {
      db.serialize(() => {
        let id: Token['id'];

        const statement = db.prepare(`INSERT INTO ${tableName} VALUES (?)`);
        statement.run(token, function(err) {
          if(err) {
            rej(err);
            return;
          }

          id = this.lastID;
        });
        statement.finalize(() => {
          res({ id, token });
        });
      });
    });
  },
  has(token: TokenPayload['token']): Promise<boolean> {
    return new Promise((res, rej) => {
      db.serialize(() => {
        let result = false;

        db.each(
          `SELECT token FROM ${tableName}`,
          (err, row) => {
            if(err) {
              rej(err);
              return;
            }

            castTo<Token>(row);

            if(row.token === token) {
              result = true;
            }
          },
          err => {
            if(err) {
              rej(err);
              return;
            }

            res(result);
          },
        );
      });
    });
  },
  closeDb() {
    db.close();
  },
};
