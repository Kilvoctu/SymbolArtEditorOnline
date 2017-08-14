﻿function pseudoCubicSplineColor(i) {
    return (i >= 0 && i < pseudoCubicSpline.length) ?
        pseudoCubicSpline[i] : i;
}
function revertPseudoCubicSplineColor(color) {
    return (color >= pseudoCubicSpline[0]
        && color < pseudoCubicSpline[pseudoCubicSpline.length - 1]) ?
        pseudoCubicSpline.indexOf(color) : color;
}

var pseudoCubicSpline = [
//rounded //raw //index
0,   //0.0000, //0
0,   //0.2596, //1
1,   //0.5193, //2
1,   //0.7791, //3
1,   //1.0391, //4
1,   //1.2993, //5
2,   //1.5599, //6
2,   //1.8209, //7
2,   //2.0823, //8
2,   //2.3443, //9
3,   //2.6069, //10
3,   //2.8701, //11
3,   //3.1341, //12
3,   //3.3990, //13
4,   //3.6640, //14
4,   //3.9310, //15
4,   //4.1980, //16
4,   //4.4670, //17
5,   //4.7370, //18
5,   //5.0080, //19
5,   //5.2800, //20
6,   //5.5530, //21
6,   //5.8280, //22
6,   //6.1040, //23
6,   //6.3820, //24
7,   //6.6610, //25
7,   //6.6942, //26
7,   //7.2250, //27
8,   //7.5100, //28
8,   //7.7960, //29
8,   //8.0840, //30
8,   //8.3750, //31
9,   //8.6670, //32
9,   //8.9610, //33
9,   //9.2580, //34
10,  //9.5570, //35
10,  //9.8580, //36
10,  //10.161, //37
10,  //10.467, //38
11,  //10.776, //39
11,  //11.087, //40
11,  //11.400, //41
12,  //11.717, //42
12,  //12.036, //43
12,  //12.358, //44
13,  //12.683, //45
13,  //13.010, //46
13,  //13.341, //47
14,  //13.675, //48
14,  //14.012, //49
14,  //14.353, //50
15,  //14.696, //51
15,  //15.043, //52
15,  //15.394, //53
16,  //15.748, //54
16,  //16.105, //55
16,  //16.466, //56
17,  //16.831, //57
17,  //17.200, //58
18,  //17.572, //59
18,  //17.948, //60
18,  //18.328, //61
19,  //18.713, //62
19,  //19.101, //63
19,  //19.493, //64
20,  //19.890, //65
20,  //20.291, //66
21,  //20.696, //67
21,  //21.106, //68
22,  //21.520, //69
22,  //21.939, //70
22,  //22.363, //71
23,  //22.791, //72
23,  //23.223, //73
24,  //23.661, //74
24,  //24.104, //75
25,  //24.551, //76
25,  //25.003, //77
25,  //25.461, //78
26,  //25.924, //79
26,  //26.392, //80
27,  //26.865, //81
27,  //27.343, //82
28,  //27.827, //83
28,  //28.316, //84
29,  //28.811, //85
29,  //29.312, //86
30,  //29.818, //87
30,  //30.330, //88
31,  //30.848, //89
31,  //31.371, //90
32,  //31.900, //91
32,  //32.440, //92
33,  //32.980, //93
34,  //33.530, //94
34,  //34.080, //95
35,  //34.640, //96
35,  //35.210, //97
36,  //35.780, //98
36,  //36.360, //99
37,  //36.940, //100
38,  //37.540, //101
38,  //38.140, //102
39,  //38.740, //103
39,  //39.350, //104
40,  //39.970, //105
41,  //40.600, //106
41,  //41.230, //107
42,  //41.870, //108
43,  //42.520, //109
43,  //43.180, //110
44,  //43.840, //111
45,  //44.510, //112
45,  //45.190, //113
46,  //45.870, //114
47,  //46.560, //115
47,  //47.260, //116
48,  //47.970, //117
49,  //48.690, //118
49,  //49.410, //119
50,  //50.150, //120
51,  //50.890, //121
52,  //51.640, //122
52,  //52.400, //123
53,  //53.170, //124
54,  //53.940, //125
55,  //54.730, //126
56,  //55.520, //127
56,  //56.320, //128
57,  //57.130, //129
58,  //57.960, //130
59,  //58.790, //131
60,  //59.630, //132
61,  //60.480, //133
61,  //61.340, //134
62,  //62.200, //135
63,  //63.080, //136
64,  //63.970, //137
65,  //64.870, //138
66,  //65.780, //139
67,  //66.700, //140
68,  //67.630, //141
69,  //68.570, //142
70,  //69.520, //143
70,  //70.480, //144
71,  //71.450, //145
72,  //72.440, //146
73,  //73.430, //147
74,  //74.430, //148
75,  //75.450, //149
76,  //76.480, //150
78,  //77.510, //151
79,  //78.560, //152
80,  //79.630, //153
81,  //80.700, //154
82,  //81.780, //155
83,  //82.880, //156
84,  //83.990, //157
85,  //85.110, //158
86,  //86.240, //159
87,  //87.390, //160
89,  //88.540, //161
90,  //89.710, //162
91,  //90.890, //163
92,  //92.090, //164
93,  //93.300, //165
95,  //94.520, //166
96,  //95.750, //167
97,  //96.990, //168
98,  //98.250, //169
100, //99.530, //170
101, //100.81, //171
102, //102.11, //172
103, //103.42, //173
105, //104.75, //174
106, //106.09, //175
107, //107.44, //176
109, //108.81, //177
110, //110.19, //178
112, //111.58, //179
113, //112.99, //180
114, //114.42, //181
116, //115.86, //182
117, //117.31, //183
119, //118.78, //184
120, //120.26, //185
122, //121.75, //186
123, //123.27, //187
125, //124.79, //188
126, //126.33, //189
128, //127.89, //190
129, //129.46, //191
131, //131.05, //192
133, //132.65, //193
134, //134.27, //194
136, //135.91, //195
138, //137.56, //196
139, //139.22, //197
141, //140.90, //198
143, //142.60, //199
144, //144.31, //200
146, //146.04, //201
148, //147.79, //202
150, //149.55, //203
151, //151.32, //204
153, //153.11, //205
155, //154.92, //206
157, //156.74, //207
159, //158.57, //208
160, //160.42, //209
162, //162.28, //210
164, //164.15, //211
166, //166.03, //212
168, //167.93, //213
170, //169.84, //214
172, //171.76, //215
174, //173.69, //216
176, //175.64, //217
178, //177.59, //218
180, //179.56, //219
182, //181.54, //220
184, //183.52, //221
186, //185.52, //222
188, //187.52, //223
190, //189.54, //224
192, //191.56, //225
194, //193.59, //226
196, //195.63, //227
198, //197.68, //228
200, //199.74, //229
202, //201.80, //230
204, //203.88, //231
206, //205.95, //232
208, //208.04, //233
210, //210.13, //234
212, //212.23, //235
214, //214.33, //236
216, //216.44, //237
219, //218.55, //238
221, //220.67, //239
223, //222.79, //240
225, //224.92, //241
227, //227.05, //242
229, //229.19, //243
231, //231.33, //244
233, //233.47, //245
236, //235.61, //246
238, //237.76, //247
240, //239.91, //248
242, //242.06, //249
244, //244.22, //250
246, //246.37, //251
249, //248.53, //252
251, //250.68, //253
253, //252.84, //254
255  //255.00  //255
];