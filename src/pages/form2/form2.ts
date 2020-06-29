import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { ControlBase } from '../../common/forms/control-base';
import { ControlsService } from '../../common/forms/controls.service';
import { FormConfigService } from '../../services/form-config.service';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the Form2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'form2.html',
  providers: []
})
export class Form2Page {
  controls: ControlBase<any>[];
  form: FormGroup;
  submitted: any;
  readonly FILENAME = 'form2-conf.json';

  constructor(public configService: FormConfigService,public controlsService:ControlsService,
    public alertCtrl: AlertController) {
    this.form= new FormGroup({});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Form2Page');
  }
  ionViewWillEnter() {
		this.configService.getFormConfig(this.FILENAME)
			.map(res => res.json())
			.subscribe(data => {
					this.controls = this.controlsService.getControls(data);
        });
        this.form.valueChanges
			.subscribe(val => {
				this.submitted = val;
			});
  }
  submitForm($event){
		let alert = this.alertCtrl.create({
		      title: 'Success!',
		      subTitle: 'Your form was successfully submitted!',
		      buttons: ['OK']
		    });
		alert.present();
		console.log("Success\n", this.submitted);
	}
}

