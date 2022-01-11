#!/bin/bash

run_test(){
    yarn test
    RESULT=$?
    if [ $RESULT -eq 0 ] ;
    then
        echo "Tests successfully completed! 👌✨"
        echo "Formatting code..."
    else 
        echo "Tests failed ❌"
    fi 
    #else, varying degrees of failure
    exit $RESULT
}
num_modified_ts_files=$(git diff --name-only --cached | grep *.ts -c)

if [ $num_modified_ts_files -gt 0 ]
then
    echo "👀 Staged .ts files detected. Executing tests..."
    run_test
else 
    echo "No staged .ts files detected. Skipping testing..."
fi
exit 0