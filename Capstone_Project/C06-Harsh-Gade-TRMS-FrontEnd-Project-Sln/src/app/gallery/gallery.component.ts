// gallery.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  places = [
    {
      name: 'Eiffel Tower',
      image: '../../assets/pic1.jpg',
      description: 'A world-famous iron tower located in Paris, France.'
    },
    {
      name: 'Great Wall of China',
      image: '../../assets/pic2.jpg',
      description: 'An ancient wall built to protect Chinese empires from invaders.'
    },
    {
      name: 'Colosseum',
      image: '../../assets/pic3.jpg',
      description: 'An ancient amphitheater in the center of Rome, Italy.'
    },
    {
      name: 'Machu Picchu',
      image: '../../assets/pic4.jpg',
      description: 'A 15th-century Inca citadel located in the Andes mountains of Peru.'
    },
    {
      name: 'Statue of Liberty',
      image: '../../assets/pic5.jpg',
      description: 'A symbol of freedom and democracy, located in New York City, USA.'
    }
  ];
}
