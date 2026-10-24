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
            const source = document.createElement("source");
            source.src = `./src/audios/${audioData.name}`;
            source.type = audioData.type;
            
            audioElement.appendChild(source);
        });

        this.#htmlObjectPooling = new HTMLObjectPoolingBuilder()
                                    .setElement(audioElement)
                                    .setDefaultAmount(5)
                                    .setPoolMethod(audio => audio.play())
                                    .setUnpoolTime(audioElement.duration)
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