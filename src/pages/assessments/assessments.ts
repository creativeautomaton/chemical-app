import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheet, ActionSheetController, Config, ToastController, ModalController } from 'ionic-angular';

import { AddAssessmentPage } from '../add-assessment/add-assessment';
import { AppData } from '../../providers/app-data';

//Angularfire2
import { AngularFire,  FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-assessments',
  templateUrl: 'assessments.html'
})
export class AssessmentsPage {
    actionSheet: ActionSheet;
    remove: FirebaseListObservable<any>;
    assessments:  any[];
    keys:  any[];
    mine: boolean = true;
    // shownGroup = null;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public appData: AppData,
    public config: Config,
    public af: AngularFire,
    public auth: AuthService,
    public modalCtrl: ModalController
  ) {
    this.assessments =  [];
    this.keys =  [];
    this.remove = af.database.list('/users/' + this.auth.id() + '/assessments/', { preserveSnapshot: true } );
    this.keys = this.navParams.get('key');
   }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ChemicalsPage');
      this.assessments =  [];

       this.appData.getAssessments().then(
         assessmentData => {
           this.assessments = assessmentData;
          //  this.assessments = assessmentData.filter((filter) => {
          //     return filter.type === "device";
          //  });
           console.log(assessmentData);
         });
    }

    addAssessment(){
      let modal = this.modalCtrl.create(AddAssessmentPage);
      modal.onDidDismiss(data => {
       console.log(data);
     });
      modal.present();
    }

    // toggleGroup(group) {
    //     if (this.isGroupShown(group)) {
    //         this.shownGroup = null;
    //     } else {
    //         this.shownGroup = group;
    //     }
    // }
    // isGroupShown(group) {
    //     return this.shownGroup === group;
    // }
}
