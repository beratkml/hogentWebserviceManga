let MANGA = [{
    id: 1,
    name: 'Attack on Titan',
    chapters: '139',
    isFinished: true,
    author: 'Hajime Iisayama',
    release_date: '2013-04-13T00:00:00.000Z',
    description: 'Set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans; the story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother.',
    thumbnail: '//'
  },
  {
    id: 2,
    name: 'Berserk',
    chapters: '-',
    isFinished: false,
    author: 'Kentaro Miura',
    release_date: '1990-11-26T00:00:00.000Z',
    description: 'Set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans; the story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother.',
    thumbnail: '//'
  },
  {
    id: 3,
    name: 'Chainsaw Man',
    chapters: '79',
    isFinished: false,
    author: 'Tatsuki Fujimoto',
    release_date: '2019-03-04T00:00:00.000Z',
    description: 'Set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans; the story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother.',
    thumbnail: '//'
  },
  {
    id: 4,
    name: 'One Piece',
    chapters: '-',
    isFinished: false,
    author: 'Eiichiro Oda',
    release_date: '1997-07-22T00:00:00.000Z',
    description: 'Set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans; the story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother.',
    thumbnail: '//'
  },
]

let MANGACOLLECTION = [{
    id: 1,
    manga: {
      id: 1,
      name: 'Attack on Titan',
      chapters: '139',
      isFinished: true,
      author: 'Hajime Iisayama',
      release_date: '2013-04-13T00:00:00.000Z',
      description: 'Set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans; the story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother.',
      thumbnail: '//'
    },
    start_date: '2021-11-06T00:00:00.000Z',
    end_date: '2022-11-05',
    current_chapter: '139',
    status_reading: 'finished'
  },
  {
    id: 2,
    manga: {
      id: 2,
      name: 'Berserk',
      chapters: '-',
      isFinished: false,
      author: 'Kentaro Miura',
      release_date: '1990-11-26T00:00:00.000Z',
      description: 'Set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans; the story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother.',
      thumbnail: '//'
    },
    start_date: '2020-05-12T00:00:00.000Z',
    end_date: '-',
    current_chapter: '80',
    status_reading: 'reading'
  },
  {
    id: 3,
    manga: {
      id: 3,
      name: 'Chainsaw Man',
      chapters: '79',
      isFinished: false,
      author: 'Tatsuki Fujimoto',
      release_date: '2019-03-04T00:00:00.000Z',
      description: 'Set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans; the story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother.',
      thumbnail: '//'
    },
    start_date: '2022-05-12T00:00:00.000Z',
    end_date: '-',
    current_chapter: '200',
    status_reading: 'paused'
  }
];

USER = [{
    id: '1',
    username: 'cosea',
    password: '123456',
  },
  {
    id: '2',
    username: 'bob456',
    password: 'oepdkfdsf89',
  },
  {
    id: '3',
    username: 'lol156',
    password: 'paksodfpjz666',
  },
  {
    id: '4',
    username: 'kopkop8989',
    password: 'lol59849',
  },

]
module.exports = {
  MANGA,
  MANGACOLLECTION,
  USER
}