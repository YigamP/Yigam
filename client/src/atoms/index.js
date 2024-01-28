import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: ''
});

export const refetchState = atom({
    key: 'refetchState',
    default: 0
});
