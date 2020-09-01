import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

const DB_NAME: string = 'dbNotas.db';
const win: any = window;
let _db: any;


@Injectable()
export class Conexao {
  dbE: SQLiteObject;
  private _dbPromise: Promise<any>;
  public database: SQLite;
  public 
  constructor(public platform: Platform, private sqlite: SQLite) {

      this._dbPromise = new Promise((resolve, reject) => {
        try {

            if (this.platform.is('cordova')) {                              
                  _db = win.openDatabase(DB_NAME, '1.0', '', 1);
                  _db.transaction(function(tx) {

                        tx.executeSql('create table if not exists Notas (Id integer primary key, ' +
                                      'Titulo text, ' +
                                      'Descricao text,  ' + 
                                      'Localizacao text, ' +
                                      'Imagem text )'); 
                  }, function(error) {
                    console.log('Transaction ERROR: ' + error.message);
                  }, function() {
                    
                  });             
            } else {
                    console.log('BANCO 1');
                  _db = win.openDatabase(DB_NAME, '1.0', '', 1);
                  _db.transaction(function(tx) {
                        
                    tx.executeSql('create table if not exists Notas (Id integer primary key, ' +
                    'Titulo text, ' +
                    'Descricao text,  ' + 
                    'Localizacao text, ' +
                    'Imagem text )'); 
                    console.log('BANCO 2');
                  }, function(error) {
                    console.log('Transaction ERROR: ' + error.message);
                  }, function() {
                    
                  });
            }
            resolve(_db);
          }
          catch (err) {
            reject({err: err});
          }
      });
  }

  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._dbPromise.then(db => {
          db.transaction((tx: any) => {

              tx.executeSql(query, params,
                (tx: any, res: any) => resolve({tx: tx, res: res}),
                (tx: any, err: any) => reject({tx: tx, err: err}));

          }, function(error) {
            console.log('Transaction ERROR 1 : ' + error.message);
          });
        });
      } catch (err) {
        console.log("Erro 1 = " + err);
        reject({err: err});
      }
    });
  }
  

  queryAll(query: any[], params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._dbPromise.then(db => {
          db.transaction((tx: any) => {

            query.forEach((valueQuery, key, index) => {
                tx.executeSql(valueQuery, params,
                  (tx: any, res: any) => resolve({tx: tx, res: res}),
                  (tx: any, err: any) => reject({tx: tx, err: err})
                );

            });

          }, function(error) {
            console.log('Transaction ERROR 2 : ' + error.message);
          });
        });
      } catch (err) {
        console.log("Erro 2 = " + err);
        reject({err: err});
      }
    });
  }
}
