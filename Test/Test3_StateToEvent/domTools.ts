namespace IDE {
    export class domTools {
        public static createIcon(imageName: string): HTMLInputElement {
            var btnQQ: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            btnQQ.className = "icon";
            btnQQ.src = "images/" + imageName+".png";
            btnQQ.type = "image";
            return btnQQ;
        }

        public static createPeople(name: string, app: App): HTMLInputElement {
            var btnPeople: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            btnPeople.className = "people";
            btnPeople.type = "image";
            btnPeople.value = name;
            btnPeople.onclick = () => {
                app.changeState(new IDE.MessageState(name));
            }
            return btnPeople;
        }
    }
}