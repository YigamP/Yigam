import { UserRepository } from '../../users/repositories/userRepository.js';
import { SearchHistoryRepository } from '../repositories/searchRepository.js';
import axios from 'axios';

class SearchHistoryService {
    static async getSearchHistory({ page, pageSize }) {
        const skip = (page - 1) * pageSize;
        try {
            const searches = await SearchHistoryRepository.getSearchHistory({ pageSize, skip });

            const totalSearchHistoryCount = await SearchHistoryRepository.getTotalSearchHistories();

            const totalPages = Math.ceil(totalSearchHistoryCount / pageSize);

            return { searches, totalPages };
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getAllSearchHistory() {
        try {
            const searches = await SearchHistoryRepository.getAllSearchHistory();

            return searches;
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getSearchAiData({ content, email }) {
        try {
            const user = await UserRepository.getUser({ email });
            const nickname = user.nickname;
            if (user) {
                await SearchHistoryRepository.addSearchData({ content, email, nickname });
            }

            const { data } = await axios.post('http://localhost:5000/searches', { content });
            if (data) {
                const filterData = data[0][0].map((item, index) => {
                    return {
                        question: item,
                        answer: data[0][1][index],
                        accuracy: parseFloat(data[1][index].toFixed(3))
                    };
                });
                console.log(filterData);

                return filterData;
            } else {
                console.log('데이터가 없습니다.');
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { SearchHistoryService };
