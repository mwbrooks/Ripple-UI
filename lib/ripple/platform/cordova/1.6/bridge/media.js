/*
 *  Copyright 2011 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var audioObjects = {}
    noop = function () {};

module.exports = {
    create: function (success, error, args) {
        error = error || noop;
        success = success || noop;
        console.log(args);
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }
        console.log("w00t");

        var id = args[0],
            src = args[1];

        audioObjects[id] = new Audio(src);
        success();
    },
    startPlayingAudio: function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id];

        if (args.length === 1) {
            error("Media source argument not found");
        }

        if (audio) {
            audio.pause();
            audioObjects[id] = undefined;
        }

        audio = audioObjects[id] = new Audio(args[1]);
        audio.play();

        success();
    },
    stopPlayingAudio: function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id],
            result;

        if (!audio) {
            error("Audio Object has not been initialized");
        }

        audio.pause();
        audioObjects[id] = undefined;

        success();
    },
    seekToAudio: function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id];

        if (!audio) {
            error("Audio Object has not been initialized");
        } else if (args.length === 1) {
            error("Media seek time argument not found");
        } else {
            try {
                audio.currentTime = args[1];
            } catch (e) {
                error("Error seeking audio: " + e);
            }

            success();
        }

        success();
    },
    pausePlayingAudio: function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id],
            result;

        if (!audio) {
            error("Audio Object has not been initialized");
        }

        audio.pause();
        success();
    },
    getCurrentPositionAudio: function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id],
            result;

        if (!audio) {
            error("Audio Object has not been initialized");
        }

        success(audio.currentTime);
    },
    getDuration: function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id],
            result;

        if (!audio) {
            error("Audio Object has not been initialized");
        }

        success(audio.duration);
    },
    startRecordingAudio: function (success, error, args) {
        error = error || noop;
        error("Not supported");
    },
    stopRecordingAudio: function (success, error, args) {
        error = error || noop;
        error("Not supported");
    },
    release: function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id],
            result;

        if (audio) {
            audioObjects[id] = undefined;
            audio.src = undefined;
            //delete audio;
        }

        success();
    }
};
