import React, { useEffect, useState } from 'react';
import {
  BugDexPhone,
  StagBeetleArt,
  BlueBeetleArt,
  TypeIcon,
  SparkleIcon,
  RarityGem,
} from './BugDexDemoShared';
import './BugDexDemoShared.css';

const BEETLE_CARD_ART = `${process.env.PUBLIC_URL}/images/bug-club/beetle-card.png`;
const CAROUSEL_MS = 3600;

const CARDS = [
  {
    name: 'Irideon',
    hp: 55,
    type: 'ground',
    rule: '#c9982d',
    art: { kind: 'photo', src: BEETLE_CARD_ART },
    info: 'N° 014 · Moss Walker · 28 mm · 1.2 g',
    attacks: [
      { name: 'Mandible Snap', desc: 'Clamps prey with powerful jaws and drags it under leaf litter.', dmg: 30 },
      { name: 'Leaf Scuttle', desc: 'Darts beneath moss at the first vibration of a footfall.', dmg: 20 },
    ],
    flavour: 'A metallic hunter that prowls moss and leaf litter at dusk. Its iridescent shell flashes violet when it turns in the sun.',
    weakness: 'water',
    retreat: '●',
    species: 'Violet ground beetle',
    latin: 'Carabus violaceus',
    rarity: 'common',
    holo: false,
    stats: { weight: '1.2 g', type: 'Ground', length: '28 mm' },
  },
  {
    name: 'Duelhorn',
    hp: 90,
    type: 'ground',
    rule: '#dfb959',
    art: { kind: 'stag', size: 104 },
    info: 'N° 001 · Oakwood Duelist · 70 mm · 4 g',
    attacks: [
      { name: 'Antler Lock', desc: 'Grapples rivals with antler jaws and hurls them from the branch.', dmg: 50 },
      { name: 'Sap Feast', desc: 'Draws strength from oak sap sipped through a feathered tongue.', dmg: 40 },
    ],
    flavour: 'A dusk-flying duelist crowned with antler jaws. Its youth was seven hidden years chewing through rotting oak.',
    weakness: 'water',
    retreat: '● ●',
    species: 'Stag beetle (male)',
    latin: 'Lucanus cervus',
    rarity: 'ultra',
    holo: true,
    stats: { weight: '4 g', type: 'Ground', length: '70 mm' },
  },
  {
    name: 'Azurehood',
    hp: 60,
    type: 'bug',
    rule: '#7eb8d4',
    art: { kind: 'blue', size: 104 },
    info: 'N° 003 · Sky Stalker · 22 mm · 0.8 g',
    attacks: [
      { name: 'Wing Flash', desc: 'Bursts skyward on iridescent wings to startle predators.', dmg: 25 },
      { name: 'Petal Drop', desc: 'Plummets from blossoms to ambush aphids on the stem below.', dmg: 35 },
    ],
    flavour: 'A jewel-bright hunter that patrols hawthorn hedges at dawn, turning leaves into launchpads.',
    weakness: 'fire',
    retreat: '●',
    species: 'Blue shield beetle',
    latin: 'Coleoptera sp.',
    rarity: 'uncommon',
    holo: false,
    stats: { weight: '0.8 g', type: 'Bug', length: '22 mm' },
  },
];

const RARITY_LABELS = {
  common: 'Common',
  uncommon: 'Uncommon',
  ultra: 'Ultra Rare',
};

function CardArt({ art }) {
  if (art.kind === 'photo') {
    return <img src={art.src} alt="" aria-hidden="true" className="bugdex-demo__card-art-img" />;
  }
  if (art.kind === 'stag') return <StagBeetleArt size={art.size} />;
  if (art.kind === 'blue') return <BlueBeetleArt size={art.size} />;
  return null;
}

function TradingCard({ card, hotAttack }) {
  return (
    <div className="bugdex-demo__card">
      {card.holo && <div className="bugdex-demo__holo" />}
      <div className="bugdex-demo__card-head">
        <span className="bugdex-demo__card-wild">WILD</span>
        <span className="bugdex-demo__card-name">{card.name}</span>
        <span className="bugdex-demo__card-hp">
          <span>HP</span>{card.hp}
        </span>
        <TypeIcon type={card.type} size={14} />
      </div>
      <div className="bugdex-demo__card-rule" style={{ background: card.rule }} />
      <div className="bugdex-demo__card-art">
        <CardArt art={card.art} />
      </div>
      <div className="bugdex-demo__card-info">{card.info}</div>
      {card.attacks.map((attack, i) => (
        <div key={attack.name} className={`bugdex-demo__attack ${hotAttack === i ? 'is-hot' : ''}`}>
          <TypeIcon type={card.type} size={10} />
          <div className="bugdex-demo__attack-body">
            <div className="bugdex-demo__attack-name">{attack.name}</div>
            <div className="bugdex-demo__attack-desc">{attack.desc}</div>
          </div>
          <div className="bugdex-demo__attack-dmg">{attack.dmg}</div>
        </div>
      ))}
      <div className="bugdex-demo__card-flavour">{card.flavour}</div>
      <div className="bugdex-demo__card-meta">
        <span>
          Weakness <TypeIcon type={card.weakness} size={7} /> ×2
        </span>
        <span className="is-dim">Resistance —</span>
        <span className="is-dim">Retreat {card.retreat}</span>
      </div>
      <div className="bugdex-demo__card-foot">
        <div className="bugdex-demo__card-species">
          {card.species}
          <em>{card.latin}</em>
        </div>
        <div className="bugdex-demo__card-rarity">
          {card.rarity === 'ultra' ? <SparkleIcon size={9} /> : <RarityGem rarity={card.rarity} size={7} />}
          {RARITY_LABELS[card.rarity]}
        </div>
      </div>
    </div>
  );
}

function CardStatStrip({ stats }) {
  return (
    <div className="bugdex-demo__stat-strip" key={stats.weight + stats.type + stats.length}>
      <div className="bugdex-demo__stat-cell">
        <strong>{stats.weight}</strong>
        <span>Weight</span>
      </div>
      <div className="bugdex-demo__stat-sep" />
      <div className="bugdex-demo__stat-cell">
        <strong>{stats.type}</strong>
        <span>Type</span>
      </div>
      <div className="bugdex-demo__stat-sep" />
      <div className="bugdex-demo__stat-cell">
        <strong>{stats.length}</strong>
        <span>Length</span>
      </div>
    </div>
  );
}

export default function BugDexCardDemo({ className = '' }) {
  const [active, setActive] = useState(0);
  const [hotAttack, setHotAttack] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHotAttack((a) => (a + 1) % 2), 2100);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((i) => (i + 1) % CARDS.length);
      setHotAttack(0);
    }, CAROUSEL_MS);
    return () => clearInterval(t);
  }, []);

  const card = CARDS[active];

  return (
    <BugDexPhone className={className}>
      <div className="bugdex-demo__sheet-bar">
        <span className="bugdex-demo__sheet-title" key={card.name}>{card.name}</span>
      </div>
      <div className="bugdex-demo__card-stage bugdex-demo__card-stage--carousel">
        <div className="bugdex-demo__card-carousel">
          <div
            className="bugdex-demo__card-carousel-track"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {CARDS.map((item, i) => (
              <div key={item.name} className="bugdex-demo__card-carousel-slide">
                <TradingCard card={item} hotAttack={i === active ? hotAttack : 0} />
              </div>
            ))}
          </div>
        </div>
        <CardStatStrip stats={card.stats} />
        <div className="bugdex-demo__card-dots" aria-hidden="true">
          {CARDS.map((item, i) => (
            <span key={item.name} className={`bugdex-demo__card-dot ${i === active ? 'is-active' : ''}`} />
          ))}
        </div>
      </div>
    </BugDexPhone>
  );
}
