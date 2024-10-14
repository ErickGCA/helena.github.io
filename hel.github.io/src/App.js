import confetti from 'canvas-confetti';
import { Howl } from 'howler';
import React, { useEffect, useState } from 'react';
import './App.css';
import Personagem from './Fotos/10aa8b5a-7f57-4fb2-90a4-e92a8fb2a59f.jpeg';
import backgroundMusicFile from './Fotos/Corcovado.mp3';
import serie from './Fotos/f9ddd832d1b566f5b8dd29a4dbc76b7531c420c8c8d9fdfe94eca128bda8e2b1.jpg';
import fotofav from './Fotos/Imagem do WhatsApp de 2024-10-14 à(s) 18.42.26_d0b3147d.jpg';
import musicaImg from './Fotos/Imagem do WhatsApp de 2024-10-14 à(s) 19.09.14_7581560f.jpg';
import memoria from './Fotos/Imagem do WhatsApp de 2024-10-14 à(s) 19.15.03_a534322f.jpg';
import cor from './Fotos/Sem Título-1.png';
import universo from './Fotos/space-background-with-stardust-shining-stars-realistic-colorful-cosmos-with-nebula-milky-way.jpg';
import Flor from './Fotos/sunset-815270_1280.jpg';
import AnimalImg from './Fotos/um-lindo-cao-border-collie-vestido-com-uma-roupa-branca-lilas-de-natal-isolada-em-fundo-plano_866772-1587.jpg';

// Som para o clique
const clickSound = new Howl({
  src: ['./Fotos/Corcovado.mp3'], // Certifique-se de que este caminho está correto
});

// Música de fundo
const backgroundMusic = new Howl({
  src: [backgroundMusicFile],
  loop: true,
  volume: 0.5,
  html5: true,
  onload: () => {
    console.log('Música de fundo carregada com sucesso.');
  },
  onloaderror: (id, error) => {
    console.error('Erro ao carregar a música de fundo:', error);
  },
  onplayerror: (id, error) => {
    console.error('Erro ao tentar reproduzir a música de fundo:', error);
  },
});

// As fotos que você vai usar
const photos = {
  Animal: AnimalImg,
  Lugar: universo,
  Flor: Flor,
  Personagem: Personagem,
  Foto: fotofav,
  Música: musicaImg,
  Memorias: memoria,
  Cor: cor,
  Filme: serie,
};

// As explicações para cada foto
const explanations = {
  Animal: 'Nunca vou esquecer a forma como você reagiu quando te chamei de Border Collie, espero que um dia possamos ter um.',
  Lugar: 'Pensei em muitos lugares que poderia te representar, mas para mim, você é o meu universo e nada seria tão grandioso o suficiente pra te resumir.',
  Flor: 'Um campo de rosa pode parecer cliche, mas deixei de ter medo do cliche desde que te conheci.',
  Personagem: 'Arlequina talvez seja uma escolha muito duvidosa, mas eu acho incrível, ela é inteligente, doida e companheira, conheço alguém assim kkkkk.',
  Foto: 'Impossível não escolher essa, o seu sorriso é a coisa mais linda da minha vida e te ver feliz me faz feliz.',
  Música: 'Não tinha como ser diferente, lembro de quando entrei no seu Spotify e escutei essa em loop durante horas.',
  Memorias: 'Pensei em colocar alguma viagem ou passeio, mas sinto que essa imagem te resume bem.',
  Cor: 'IM JUST A GIRL não é mesmo? Eu te amo <3.',
  Filme: 'Talvez o que eu tenha ficado mais em dúvida, mas o Forrest sabia de algo.',
};

function App() {
  const [revealedPhotos, setRevealedPhotos] = useState([]);
  const [popup, setPopup] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Função para iniciar a música de fundo
  const handlePlayMusic = () => {
    backgroundMusic.play();
    setIsMusicPlaying(true);
  };

  const handleClick = (key) => {
    clickSound.play(); // Toca o som ao clicar

    // Lança confetes em formato de coração ao clicar
    confetti({
      particleCount: 100,
      spread: 70,
      angle: 60,
      origin: { x: 0.5, y: 0.5 },
      shapes: ['heart'], // Configura as partículas como corações
      colors: ['#FF69B4', '#FF1493', '#FFB6C1'],
    });

    if (!revealedPhotos.includes(key)) {
      setRevealedPhotos([...revealedPhotos, key]);
    } else {
      setPopup(true);
      setCurrentExplanation(explanations[key]);
    }
  };

  // Verifica se todas as fotos foram reveladas
  const allPhotosRevealed = revealedPhotos.length === Object.keys(photos).length;

  useEffect(() => {
    return () => {
      backgroundMusic.unload();
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">Clique nos quadrados, meu amor!</h1>
      
      {/* Botão para iniciar a música de fundo */}
      {!isMusicPlaying && (
        <button className="play-button" onClick={handlePlayMusic}>
          🎵 Tocar Músiquinha
        </button>
      )}

      <div className="grid-container">
        {Object.keys(photos).map((key) => (
          <div key={key} className="grid-item" onClick={() => handleClick(key)}>
            {!revealedPhotos.includes(key) ? (
              <span className="typewriter-text">{key}</span>
            ) : (
              <img src={photos[key]} alt={key} className="photo" />
            )}
          </div>
        ))}
      </div>

      {popup && (
        <div className="popup">
          <div className="popup-content">
            <p>{currentExplanation}</p>
            <button onClick={() => setPopup(false)}>Fechar</button>
          </div>
        </div>
      )}

      {allPhotosRevealed && (
        <div className="special-message">
          <h1>Eu te amo!</h1>
        </div>
      )}
    </div>
  );
}

export default App;