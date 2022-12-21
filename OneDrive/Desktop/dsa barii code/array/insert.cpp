#include <iostream>
using namespace std;
struct array
{
 int a[20];
 int size;
 int lenght;
};

// lets write a fuction for adding,append element at the end 
void append(struct array *arr,int x)
{
 if(arr->lenght < arr->size)
   arr->a[arr->lenght]=x;
   arr->lenght++;
}
// for inserting element in an array code is
void insert(struct array *arr,int index,int x)
{
    int i;
    if(index>=0&&index<=arr->lenght)
    {
     for(i=arr->lenght;i>index;i--)
     {
         arr->a[i]=arr->a[i-1];
     }
     arr->a[index]=x;
     arr->lenght++;
    }
}
void display(struct array arr)
{
    int i;
    cout<<"elements are"<<endl;
    for(i=0;i<arr.lenght;i++)
     printf("%d",arr.a[i]);
}
int main()
{
    struct array arr={{2,3,4,5,6},20,5};   
append(&arr,7); // aded 7 at last place available
insert(&arr,3,90);// inserted 90 in 3 index
display(arr);
    return 0;
}