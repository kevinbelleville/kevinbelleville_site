def smooth(begin, end, test):
	for i in range(begin, end, test):
		print(i)
		if i == 9:
			smooth(end, begin, -test)


smooth(1,10,1)