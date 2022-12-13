def main():
    result_list = []
    with open('numbers.txt', 'r') as file:
        data = file.read()
    for index, elf in enumerate(data.split('\n\n')):
        result_list.append(0)
        for cal in elf.split('\n'):
            result_list[index] += int(cal)
    print(max(result_list))

    most_caloric = []
    for i in range(3):
        greater_cal = max(result_list)
        most_caloric.append(greater_cal)
        result_list.remove(greater_cal)
    print(sum(most_caloric))

if __name__ == '__main__':
    main()

    