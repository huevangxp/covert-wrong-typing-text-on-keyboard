<template>
    <div>
        <v-app>
            <v-app-bar>
                <v-app-bar-title>My App</v-app-bar-title>
            </v-app-bar>
            <v-main>
                <v-container>
                    <slot />
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>