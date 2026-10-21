import { HTMLObjectPoolingBuilder } from './HTMLObjectPooling/HTMLObjectPoolingBuilder.js'

// ----------------------------------------------
// CLASS
// ----------------------------------------------

export class SFX
{
    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #htmlObjectPooling = undefined;

    // ----------------------------------------------
    // CONSTRUCTORS
    // ----------------------------------------------

    constructor(...data)
    {
        const htmlBody = document.querySelectorAll("body")[0];

        const audioElement = document.createElement("audio");
        htmlBody.appendChild(audioElement);

        data.forEach(audioData => {            
            console.log(audioData)
            const source = document.createElement("source");
            source.src = `./src/audios/${audioData.name}`;
            source.type = audioData.type;
            
            audioElement.appendChild(source);
        });

        this.#htmlObjectPooling = new HTMLObjectPoolingBuilder()
                                    .setElement(audioElement)
                                    .setDefaultAmount(5)
                                    .setPoolMethod(audio => audio.play())
                                    .build();
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    play()
    {
        this.#htmlObjectPooling.pool();
    }
}