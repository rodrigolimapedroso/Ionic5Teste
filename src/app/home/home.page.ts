import { Component, OnInit } from '@angular/core';
import { CreatePage} from '../../pages/Create/create.page';
import { ModalController } from '@ionic/angular';
import { Conexao } from '../../providers/conexao';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  public filtroCreateString = "";
  public resultListNotas;
  constructor(public modalCtrl: ModalController, public conexao: Conexao) {



  }
  ngOnInit() {
    this.buscadados();
  }

  buscadados()
  {
    this.getNotas((lista) => {
        //console.log("lista = " + JSON.stringify(lista));
        this.resultListNotas = [];
        this.resultListNotas = lista;
    });
  }
   
  getNotas(successCallback) {
    //console.log("NOTA");
      let list = [];
      return this.conexao.query('SELECT * FROM Notas order by Id desc',[]).then(data => {
          if (data.res.rows.length > 0) {
              for(let i = 0; i < data.res.rows.length; i++) {
                  let notasLista = {
                      Titulo: data.res.rows.item(i).Titulo,
                      Descricao: data.res.rows.item(i).Descricao,
                      Localizacao: data.res.rows.item(i).Localizacao,
                      Imagem: data.res.rows.item(i).Imagem
                  };
                  list.push(notasLista);
              }
              successCallback(list);
          }
          else{
              successCallback(null);
          }
      }, (error) => {
          console.log("getNotas() - ERRO na leitura da Tabela: " + JSON.stringify(error));
      });  
  }


  getNotasFiltro(filtro, successCallback) {
    //console.log("NOTA");
      let list = [];
     
      return this.conexao.query('select * from Notas WHERE Titulo LIKE "%' + filtro + '%" or Descricao LIKE "%' + filtro + '%" order by Id desc',[]).then(data => {
          if (data.res.rows.length > 0) {
              for(let i = 0; i < data.res.rows.length; i++) {
                  let notasLista = {
                      Titulo: data.res.rows.item(i).Titulo,
                      Descricao: data.res.rows.item(i).Descricao,
                      Localizacao: data.res.rows.item(i).Localizacao,
                      Imagem: data.res.rows.item(i).Imagem
                  };
                  list.push(notasLista);
              }
              successCallback(list);
          }
          else{
              successCallback(null);
          }
      }, (error) => {
          console.log("getNotas() - ERRO na leitura da Tabela: " + JSON.stringify(error));
      });  
  }

  
  filterItems(searchTerm) {
    //console.log("searchTerm = " + this.filtroCreateString);
    if(this.filtroCreateString.length > 0){
      this.getNotasFiltro(this.filtroCreateString, (lista) => {
        //console.log("lista = " + JSON.stringify(lista));
        this.resultListNotas = [];
        this.resultListNotas = lista;
    });
    }
    else
    {
      this.buscadados();
    }
  }

  async addNotas(){
    const modal = await this.modalCtrl.create({
      component: CreatePage,
      componentProps: { }
    });

    modal.onDidDismiss().then((data) => {
        this.buscadados();
    });

    return await modal.present();
  }

  async visualizacaoNotas(dados){
    const modal = await this.modalCtrl.create({
      component: CreatePage,
      componentProps: { dados: dados }
    });
    return await modal.present();
  }

  clearfilterCreate(searchTerm) {


  }
  
}
