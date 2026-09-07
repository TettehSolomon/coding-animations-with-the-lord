/* ======================================================
   Coding Animations with the Lord — Episode 4
   The Nativity · Luke 2:1–20 (King James Version)

   Pure data — no JSX. `progressRange` is the 0–1 slice of
   total scroll this scene occupies; the background layers
   (Sky, Stars, StarOfBethlehem) read these ranges to line up
   colour/brightness beats with the scene currently in view,
   and `effect` flags a one-shot animation the scene itself
   should fire when it scrolls into view.
   ====================================================== */

export const scenes = [
  {
    id: 'decree',
    ref: 'Luke 2:1–5',
    caption: 'A decree goes out',
    strong: 'And it came to pass in those days, that there went out a decree from Caesar Augustus, that all the world should be taxed.',
    rest: 'And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem, to be taxed with Mary his espoused wife, being great with child.',
    progressRange: [0.00, 0.12],
    effect: null,
  },
  {
    id: 'manger',
    ref: 'Luke 2:6–7',
    caption: 'Born in Bethlehem',
    strong: 'And so it was, that, while they were there, the days were accomplished that she should be delivered. And she brought forth her firstborn son,',
    rest: 'and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn.',
    progressRange: [0.12, 0.24],
    effect: null,
  },
  {
    id: 'field',
    ref: 'Luke 2:8',
    caption: 'Shepherds by night',
    strong: 'And there were in the same country shepherds abiding in the field,',
    rest: 'keeping watch over their flock by night.',
    progressRange: [0.24, 0.36],
    effect: null,
  },
  {
    id: 'glory',
    ref: 'Luke 2:9',
    caption: 'The glory of the Lord',
    strong: 'And, lo, the angel of the Lord came upon them, and the glory of the Lord shone round about them:',
    rest: 'and they were sore afraid.',
    progressRange: [0.36, 0.46],
    effect: 'glory-burst',
  },
  {
    id: 'goodTidings',
    ref: 'Luke 2:10–12',
    caption: 'Good tidings of great joy',
    strong: 'And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people.',
    rest: 'For unto you is born this day in the city of David a Saviour, which is Christ the Lord. And this shall be a sign unto you; Ye shall find the babe wrapped in swaddling clothes, lying in a manger.',
    progressRange: [0.46, 0.60],
    effect: null,
  },
  {
    id: 'heavenlyHost',
    ref: 'Luke 2:13–14',
    caption: 'Glory to God in the highest',
    strong: 'And suddenly there was with the angel a multitude of the heavenly host praising God, and saying,',
    rest: 'Glory to God in the highest, and on earth peace, good will toward men.',
    progressRange: [0.60, 0.72],
    effect: 'heavenly-host',
  },
  {
    id: 'shepherdsVisit',
    ref: 'Luke 2:15–16',
    caption: 'Let us go and see',
    strong: 'And it came to pass, as the angels were gone away from them into heaven, the shepherds said one to another, Let us now go even unto Bethlehem, and see this thing which is come to pass.',
    rest: 'And they came with haste, and found Mary, and Joseph, and the babe lying in a manger.',
    progressRange: [0.72, 0.86],
    effect: null,
  },
  {
    id: 'outro',
    ref: 'Luke 2:17–20',
    caption: 'Glorifying and praising God',
    strong: 'And when they had seen it, they made known abroad the saying which was told them concerning this child. And all they that heard it wondered.',
    rest: 'But Mary kept all these things, and pondered them in her heart. And the shepherds returned, glorifying and praising God for all the things that they had heard and seen, as it was told unto them.',
    progressRange: [0.86, 1.00],
    effect: null,
  },
]
