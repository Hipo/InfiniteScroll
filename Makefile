SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

BASE_FILES = ${SRC_DIR}/hipo.infinityscroll.js

MODULES = ${BASE_FILES}

JQ = ${DIST_DIR}/hipo.infinityscroll.js
JQ_MIN = ${DIST_DIR}/hipo.infinityscroll.min.js

MINJAR = java -jar ${BUILD_DIR}/yuicompressor-2.4.2.jar

all: jquery min
	@@echo "Build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

jquery: ${DIST_DIR} ${JQ}

${JQ}: ${MODULES}
	@@echo "Building" ${JQ}

	@@mkdir -p ${DIST_DIR}
	@@cat ${MODULES} > ${JQ};

	@@echo ${JQ} "Built"
	@@echo

min: ${JQ_MIN}

${JQ_MIN}: ${JQ}
	@@echo "Building" ${JQ_MIN}

	@@echo " - Compressing using Minifier"
	@@${MINJAR} ${JQ} > ${JQ_MIN}

	@@echo ${JQ_MIN} "Built"
	@@echo

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
