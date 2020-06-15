import * as utils from '../utils';
import * as types from '../types';
// import Vibrant from '../../../__mocks__/node-vibrant';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;



afterEach(() => {
    mockedAxios.get.mockClear();
});

describe("Utils for spotify actions", () => {
    describe("Shuffling array", () => {

        it("should shuffle array", () => {
            const spiedRandom = jest.spyOn(global.Math, 'random');
            spiedRandom.mockReturnValue(0.7);
            expect(utils.shuffleArray([1, 2, 3, 4, 5])).toEqual([1, 2, 5, 3, 4]);
            spiedRandom.mockRestore();
        });

        it("is pure function", () => {
            const a = [1, 2, 3];
            utils.shuffleArray(a);
            expect(a).toEqual([1, 2, 3]);
        });

    });

    describe("getSongsAmount", () => {

        it("gets total songs amount from API", async () => {

            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    total: 69,
                }
            });

            const amount = await utils.getSongsAmount();

            expect(amount).toEqual(69);
            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
            // expect(mockedAxios.get).toHaveBeenCalledWith(
            //     "https://api.spotify.com/v1/me/tracks",
            //     {
            //         params: {
            //             limit: 1,
            //         }
            //     }
            // );
        });

    });

    describe("fetchPortionSongDetails", () => {

        it("gets portion of song details from API", async () => {

            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    items: [
                        {
                            track: {
                                id: "1",
                                name: "Song 1",
                                artists: [
                                    {
                                        name: "Artist 1",
                                    }
                                ],
                                album: {
                                    images: [
                                        {
                                            url: "Album cover url",
                                        }
                                    ],
                                }
                            }
                        },
                        {
                            track: {
                                id: "2",
                                name: "Song 2",
                                artists: [
                                    {
                                        name: "Artist 2",
                                    }
                                ],
                                album: {
                                    images: [
                                        {
                                            url: "Other album cover url",
                                        }
                                    ],
                                }
                            }
                        },
                    ]
                }
            });

            const expectedSongsDetails: types.SongInformation[] = [
                {
                    "albumCover": "Album cover url",
                    "artist": "Artist 1",
                    "id": "1",
                    "title": "Song 1"
                },
                {
                    "albumCover": "Other album cover url",
                    "artist": "Artist 2",
                    "id": "2",
                    "title": "Song 2"
                }
            ];

            let offset = 5;

            const details = await utils.fetchPortionSongDetails(offset);

            expect(details).toEqual(expectedSongsDetails);
            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/me/tracks",
                {
                    params: {
                        offset: 250,
                        limit: 50,
                    }
                }
            );
        });

    });

    describe("fetchPortionSongMood", () => {
        it("gets portion of song moods from API", async () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    audio_features: [
                        {
                            id: "1",
                            valence: 0.1,
                            energy: 0.1,
                            danceability: 0.1,

                        },
                        {
                            id: "2",
                            valence: 0.2,
                            energy: 0.2,
                            danceability: 0.2,

                        },
                    ]
                }
            });

            const expectedSongsMood: types.SongMood[] = [
                {
                    "danceability": 0.1,
                    "energy": 0.1,
                    "id": "1",
                    "valence": 0.1
                },
                {
                    "danceability": 0.2,
                    "energy": 0.2,
                    "id": "2",
                    "valence": 0.2
                }
            ];

            const moods = await utils.fetchPortionSongMood("1,2");

            expect(moods).toEqual(expectedSongsMood);
            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        });

    });




});