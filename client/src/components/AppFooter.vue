<template>
    <div>
        <footer>
            <b-container>
                <b-row>
                    <b-col class="text-center"><a style="color:white" href="/">Kontakt</a></b-col>
                    <b-col class="text-center"><a style="color:white" href="/">Impressum</a></b-col>
                    <b-col class="text-center"><a style="color:white" href="/">Datenschutz</a></b-col>
                </b-row>
            </b-container>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
footer {
    background-color: black;
    color: white;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>