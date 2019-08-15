import { all } from 'redux-saga/effects';
import { authSaga, watchLoginRequest } from './auth-saga';
import { joinRoomSaga, watchJoinRoomRequest } from "./join-room-saga"
import { watchGetMessagesRequest, watchSendMessageRequest } from "./messages-saga";

export default function* rootSaga() {
    yield all([
        watchLoginRequest(),
        watchJoinRoomRequest(),
        watchGetMessagesRequest(),
        watchSendMessageRequest()
    ])
}