import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Conexao } from '../../providers/conexao';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: 'create.page.html'
})

export class CreatePage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  isVisualizacao = false;
  constructor(public formBuilder: FormBuilder, public navParams: NavParams, public conexao: Conexao, public modalCtrl: ModalController,){

  }

  ngOnInit() {
    var dados = this.navParams.get('dados');
    
    var titulo = "";
    var descricao = "";
    var localizacao = "";
    if(dados !="" && dados != null)
    {
      titulo = dados.Titulo;
      descricao = dados.Descricao;
      localizacao = dados.Localizacao;
      this.isVisualizacao = true;
    }
    this.ionicForm = this.formBuilder.group({
      titulo: [titulo, [Validators.required, Validators.minLength(2)]],
      descricao: [descricao, [Validators.required, Validators.minLength(2)]],
      localizacao: [localizacao, [Validators.required, Validators.minLength(2)]],
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  
  cadNota()
  {
      console.log(JSON.stringify(this.ionicForm.value));
      this.isSubmitted = true;
      if (!this.ionicForm.valid) {
        console.log('Please provide all the required values!')
        return false;
      } 
      else 
      {
        console.log(this.ionicForm.value)
        this.setInsert(this.ionicForm.value, (retorno) => {
            this.modalCtrl.dismiss();
        });

      }
  }


  setInsert(dados, successCallback) {

      var queryInsertHistorico = 'Titulo, ' +
                                  'Descricao, ' +
                                  'Localizacao, ' +
                                  'Imagem ';

      var queryParamtHistorico =  '"' + dados.titulo +'",' +
                                  '"' + dados.descricao +'",' +
                                  '"' + dados.localizacao +'",' +
                                  '"' + dados.imagem +'"';
                                  
      return this.conexao.query('insert into Notas('+ queryInsertHistorico +')  VALUES ('+queryParamtHistorico+')', []).then(dataJApp => {    

              successCallback(true);

      }, (error) => {
          console.log("setInsert() - ERRO na Tabela: " + JSON.stringify(error));
          successCallback(false);
      });      
  }


}
