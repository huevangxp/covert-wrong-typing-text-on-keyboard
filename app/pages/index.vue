<template>
    <div class="text-center">
       <v-img src="https://lullar-de-3.appspot.com/images/lullar_de_logo.png" width="200" height="200"  class="mx-auto"/>
       <h1 class="mt-4">ແປປະໂຫຍກ ຫຼື ຂໍ້ຄວາມທີ່ພິມຜິດຈາກພາສາອັງກິດໃຫ້ເປັນພາສາລາວ ເມື່ອລືມກົດປ່ຽນພາສາ</h1>
    </div>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="text" label="Text" />
            </v-col>
        </v-row>
        <v-btn @click="convert">Convert</v-btn>
    </v-container>
    <v-container>
    <v-card class="mt-4">
         <v-card-title>Result:</v-card-title>
         <v-card-text>{{ result }}</v-card-text>
    </v-card>
</v-container>
</template>