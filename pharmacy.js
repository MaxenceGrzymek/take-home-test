
export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

   update(){
    this.updateExpiration();
    this.updateBenefit();
  }

  updateBenefit(){
    if(this.benefit >0){
      this.benefit -=1;
    }
    if(this.benefit >0 && this.expiresIn <0){
      this.benefit -=1;
    }
  }

  updateExpiration(){
    this.expiresIn -=1;
  }

  adjustBenefit(amount){
    this.benefit = Math.min(50,Math.max(0,this.benefit + amount));
  }

}

  export class HerbalTea extends Drug{
    updateBenefit(){
      this.adjustBenefit(this.expiresIn >= 0 ? 1  : 2 );
    }
  }

  export class MagicPill extends Drug{
    updateBenefit(){
      //benefits never decreases
    }
    
    updateExpiration(){
      //never expire
    }
  }

  export class Fervex extends Drug{
    updateBenefit(){
      if(this.expiresIn < 0){         
        this.benefit = 0;
      }else if(this.expiresIn <= 5){
        this.adjustBenefit(3);
      }else if(this.expiresIn <= 10 ){
        this.adjustBenefit(2);
      }else{
        this.adjustBenefit(1);
      }
    }
  }

  export class Dafalgan extends Drug{
    updateBenefit(){
      if(this.benefit >0){
        this.benefit -=2;
      }
      if(this.benefit >0 && this.expiresIn <0){
        this.benefit -=2;
      }
    }
  }

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      if (
        this.drugs[i].name != "Herbal Tea" &&
        this.drugs[i].name != "Fervex"
      ) {
        if (this.drugs[i].benefit > 0) {
          if (this.drugs[i].name != "Magic Pill") {
            this.drugs[i].benefit = this.drugs[i].benefit - 1;
          }
        }
      } else {
        if (this.drugs[i].benefit < 50) {
          this.drugs[i].benefit = this.drugs[i].benefit + 1;
          if (this.drugs[i].name == "Fervex") {
            if (this.drugs[i].expiresIn < 11) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
            if (this.drugs[i].expiresIn < 6) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
          }
        }
      }
      if (this.drugs[i].name != "Magic Pill") {
        this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
      }
      if (this.drugs[i].expiresIn < 0) {
        if (this.drugs[i].name != "Herbal Tea") {
          if (this.drugs[i].name != "Fervex") {
            if (this.drugs[i].benefit > 0) {
              if (this.drugs[i].name != "Magic Pill") {
                this.drugs[i].benefit = this.drugs[i].benefit - 1;
              }
            }
          } else {
            this.drugs[i].benefit =
              this.drugs[i].benefit - this.drugs[i].benefit;
          }
        } else {
          if (this.drugs[i].benefit < 50) {
            this.drugs[i].benefit = this.drugs[i].benefit + 1;
          }
        }
      }
    }

    return this.drugs;
  }
}
