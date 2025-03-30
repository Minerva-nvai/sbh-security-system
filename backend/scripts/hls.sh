#!/bin/bash

ffmpeg -rtsp_transport tcp -i rtsp://localhost:8554/stream \
       -fflags nobuffer -flags low_delay -avioflags direct \
       -probesize 32 -analyzeduration 0 \
       -tune zerolatency \
       -c:v libx264 -preset ultrafast -crf 23 \
       -x264-params "keyint=15:min-keyint=15:no-scenecut=1:sliced_threads=1:nal-hrd=cbr" \
       -g 15 -r 30 \
       -c:a aac -b:a 96k -aac_coder fast \
       -hls_time 0.5 -hls_list_size 5 \
       -hls_flags delete_segments+split_by_time+independent_segments+append_list \
       -hls_segment_filename "hls/segment_%03d.ts" \
       -master_pl_name stream.m3u8 \
       hls/stream.m3u8