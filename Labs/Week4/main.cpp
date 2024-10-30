#include <vector>
#include <iostream>
#include <thread>
#include <chrono>

using namespace std;

void sumOfIntArray(vector<int> arr, int &sum) {
    for (int i = 0; i < arr.size(); i++) {
        sum += arr[i];
    }
}

vector<int> populateVector(int numOfElements) {
    vector<int> v;
    for (int i = 0; i < numOfElements; i++) {
        v.push_back(rand() % 100);
    }
    return v;
}

int main() {
    // Max number of threads supported by this hardware
    unsigned int numOfThreads = thread::hardware_concurrency();

    vector<int> nums = populateVector(1000);
    int sum = 0;
    int chunkSize = nums.size() / numOfThreads;

    auto start = chrono::high_resolution_clock::now();

    for (int i = 0; i < numOfThreads; i++) {
        vector<int> numsChunk(chunkSize);
        auto startPos = nums.begin() + i * chunkSize;
        auto endPos = nums.begin() + (i + 1) * chunkSize;
        copy(startPos, endPos, numsChunk.begin());

        thread t(&sumOfIntArray, numsChunk, ref(sum));
        t.join();
    }

    auto stop = chrono::high_resolution_clock::now();
    cout << sum << endl;
    auto duration = chrono::duration_cast<chrono::microseconds>(stop - start);
    cout << "Execution time: " << duration.count() << " microseconds" << endl;

    return 0;
}
